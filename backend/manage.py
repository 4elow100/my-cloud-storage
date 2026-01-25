#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import logging
import os
import sys


server_logger = logging.getLogger("server")


def main():
    """Run administrative tasks."""
    server_logger.info("manage.py invoked with args: %s", sys.argv)

    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings.dev")

    if "runserver" in sys.argv:
        server_logger.warning("Development server started via manage.py")
    elif "migrate" in sys.argv:
        server_logger.info("Database migration initiated")

    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == "__main__":
    main()
