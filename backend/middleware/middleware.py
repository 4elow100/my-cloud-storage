import re
import json
import logging
import time
import sys
from django.utils.deprecation import MiddlewareMixin


server_logger = logging.getLogger("server")
request_logger = logging.getLogger("requests")
body_logger = logging.getLogger("bodies")


class AutoLoggingMiddleware(MiddlewareMixin):
    SENSITIVE_PATTERNS = [
        (
            re.compile(
                r'("(?:password|pwd|passwd|token|api_key|secret|csrf|session)"\s*:\s*")[^"\']+',
                re.IGNORECASE,
            ),
            r"\1***MASKED***",
        ),
        (re.compile(r"(Bearer\s+)[^\s]+", re.IGNORECASE), r"\1***MASKED***"),
        (re.compile(r"(Basic\s+)[^\s]+", re.IGNORECASE), r"\1***MASKED***"),
        (
            re.compile(r"[\w\.-]+@[\w\.-]+\.\w+", re.IGNORECASE),
            "***EMAIL_MASKED***",
        ),
    ]

    BINARY_CONTENT_TYPES = {
        "image/",
        "application/pdf",
        "application/zip",
        "application/x-zip",
        "application/octet-stream",
        "video/",
        "audio/",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/csv",
        "text/plain",
        "multipart/form-data",
    }

    def __init__(self, get_response=None):
        self.get_response = get_response
        super().__init__(get_response)

    def mask_data(self, data: str, is_binary: bool = False) -> str:
        if is_binary:
            return (
                "***FILE_UPLOADED***"
                if "REQUEST" in data
                else "***FILE_RESPONSE***"
            )
        for pattern, replacement in self.SENSITIVE_PATTERNS:
            data = pattern.sub(replacement, data)
        return data

    def is_binary_content(self, content_type: str) -> bool:
        if not content_type:
            return False
        return any(ct in content_type for ct in self.BINARY_CONTENT_TYPES)

    def get_request_info(self, request) -> dict:
        info = {
            "method": request.method,
            "path": request.path,
            "query_params": dict(request.GET) if request.GET else None,
            "headers": {},
            "body": None,
            "user": "anonymous",
        }

        allowed_headers = {
            "content-type",
            "content-length",
            "host",
            "user-agent",
            "authorization",
            "referer",
            "origin",
        }
        for key, value in request.headers.items():
            if key.lower() in allowed_headers:
                info["headers"][key] = value

        content_type = request.headers.get("Content-Type", "").lower()
        is_binary = self.is_binary_content(content_type)

        if request.body:
            if is_binary:
                info["body"] = "***FILE_UPLOADED***"
            else:
                body_str = request.body.decode("utf-8", errors="replace")
                info["body"] = self.mask_data(body_str)

        if hasattr(request, "user") and request.user.is_authenticated:
            info["user"] = str(request.user.id)

        return info

    def get_response_info(self, response) -> dict:
        info = {
            "status_code": response.status_code,
            "content_type": response.get("Content-Type", ""),
            "content_length": response.get("Content-Length", ""),
            "content": None,
        }

        content_type = info["content_type"].lower()
        is_binary = self.is_binary_content(content_type)

        if hasattr(response, "content") and response.content:
            if is_binary:
                info["content"] = "***FILE_RESPONSE***"
            else:
                content_str = response.content.decode(
                    "utf-8", errors="replace"
                )
                info["content"] = self.mask_data(content_str[:500])

        return info

    def process_request(self, request):
        if request.path.startswith(("/static/", "/media/")):
            return None

        request.start_time = time.time()
        request.log_info = self.get_request_info(request)

        if request.log_info["body"] is not None:
            body_logger.debug(
                "REQUEST: %s %s | BODY: %s",
                request.method,
                request.path,
                request.log_info["body"],
            )

        short_log = {
            "method": request.log_info["method"],
            "path": request.log_info["path"],
            "user": request.log_info["user"],
        }
        request_logger.info(
            "REQ_START: %s", json.dumps(short_log, ensure_ascii=False)
        )

    def process_view(self, request, view_func, view_args, view_kwargs):
        if hasattr(request, "log_info"):
            request.log_info["view"] = (
                f"{view_func.__module__}.{view_func.__name__}"
            )

    def process_response(self, request, response):
        try:
            duration = time.time() - request.start_time
            response_info = self.get_response_info(response)

            if response_info["content"] is not None:
                body_logger.debug(
                    "RESPONSE: %s %s | STATUS: %d | BODY: %s",
                    request.method,
                    request.path,
                    response_info["status_code"],
                    response_info["content"],
                )

            short_log = {
                "method": request.log_info["method"],
                "path": request.log_info["path"],
                "status": response_info["status_code"],
                "duration": round(duration, 4),
            }
            request_logger.info(
                "REQ_COMPLETE: %s", json.dumps(short_log, ensure_ascii=False)
            )

            # Вывод в консоль при 500
            if response.status_code == 500:
                print(
                    f"\n\033[91m[SERVER ERROR]\033[0m "
                    f"Path: {request.path} | Method: {request.method} | "
                    f"Exception: {getattr(request, 'exception', 'Unknown')}",
                    file=sys.stderr,
                )

        except Exception as e:
            request_logger.error("Error in process_response: %s", str(e))
            print(
                f"\n\033[91m[MIDDLEWARE ERROR]\033[0m "
                f"Path: {request.path} | Error: {str(e)}",
                file=sys.stderr,
            )
        return response

    def process_exception(self, request, exception):
        request.exception = str(exception)

        request_logger.error(
            "REQ_ERROR: path=%s, method=%s, exception=%s",
            request.path,
            request.method,
            str(exception),
        )

        print(
            f"\n\033[91m[EXCEPTION]\033[0m "
            f"Path: {request.path} | Method: {request.method} | "
            f"Exception: {type(exception).__name__}: {exception}",
            file=sys.stderr,
        )
