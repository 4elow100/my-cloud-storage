from rest_framework.response import Response
from rest_framework.views import exception_handler
from rest_framework import status
from rest_framework.exceptions import (
    ValidationError,
    NotFound,
    PermissionDenied,
    NotAuthenticated,
    Throttled,
)
import logging

logger = logging.getLogger(__name__)


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is None:
        logger.error(f"Неожиданная ошибка: {exc}", exc_info=True)
        return Response(
            {"error": "Внутренняя ошибка сервера"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    if isinstance(exc, ValidationError):
        error_messages = []

        if isinstance(exc.detail, dict):
            for field, errors in exc.detail.items():
                for error in errors:
                    field_name = field.replace("_", " ").capitalize()
                    error_messages.append(f"Поле '{field_name}': {str(error)}")
        else:
            error_messages.extend([str(error) for error in exc.detail])

        response.data = {"error": " ".join(error_messages)}

    elif isinstance(exc, NotFound):
        response.data = {"error": "Ресурс не найден"}
    elif isinstance(exc, PermissionDenied):
        response.data = {
            "error": "У вас нет прав на выполнение этого действия"
        }
    elif isinstance(exc, NotAuthenticated):
        response.data = {"error": "Требуется авторизация"}
    elif isinstance(exc, Throttled):
        response.data = {
            "error": f"Превышен лимит запросов. Повторите через {exc.wait} секунд"
        }
    else:
        error_msg = str(exc) if str(exc) else "Неизвестная ошибка"
        response.data = {"error": error_msg}

    return response
