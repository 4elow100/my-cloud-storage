import logging
import os
from datetime import timezone

from django.contrib.auth import logout, authenticate, login
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views import View
from rest_framework import status, viewsets
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from apps.users.serializers import (
    RegistrationSerializer,
    AdminInterfaceSerializer,
)
from backend.settings.base import MEDIA_ROOT


def get_size_formatted(size):
    for unit in ["B", "KB", "MB", "GB", "TB"]:
        if size < 1024:
            return f"{size:.2f} {unit}"
        size /= 1024
    return f"{size:.2f} PB"


def create_user_storage(user):
    storage_uuid = user.profile.storage_uuid
    path = MEDIA_ROOT / "user_files" / str(storage_uuid)
    os.makedirs(path, exist_ok=True)


class RegistrationAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        create_user_storage(user)
        return Response(
            {"message": "Пользователь создан"}, status=status.HTTP_201_CREATED
        )


class LoginAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            return Response({"id": user.id, "username": user.username})
        return Response(
            {"error": "Неверный логин или пароль"},
            status=status.HTTP_400_BAD_REQUEST,
        )


class LogoutAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response({"success": "Вышли из системы"})


class MeAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response(
            {
                "id": user.id,
                "username": user.username,
                "is_staff": user.is_staff,
            }
        )


class AdminInterfaceViewSet(viewsets.ModelViewSet):
    queryset = User.objects.prefetch_related("folders", "files").order_by("id")
    serializer_class = AdminInterfaceSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    parser_classes = [JSONParser]
