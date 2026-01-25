import re
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserProfile


class RegistrationSerializer(serializers.Serializer):
    username = serializers.CharField(min_length=4, max_length=20)
    first_name = serializers.CharField(min_length=3)
    last_name = serializers.CharField(min_length=3)
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField()

    def validate_username(self, value):
        if not re.match(r"^[a-zA-Z][a-zA-Z0-9]*$", value):
            raise serializers.ValidationError(
                "Логин должен содержать только латинские буквы и цифры, первый символ — буква."
            )

        if len(value) < 4 or len(value) > 20:
            raise serializers.ValidationError(
                "Длина логина должна быть от 4 до 20 символов."
            )

        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Пользователь уже существует")
        return value

    def validate_email(self, value):
        if not re.match(
            r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", value
        ):
            raise serializers.ValidationError("Некорректный формат email.")
        return value

    def validate_password(self, value):
        if len(value) < 6:
            raise serializers.ValidationError(
                "Пароль должен содержать не менее 6 символов."
            )

        if not re.search(r"[A-Z]", value):
            raise serializers.ValidationError(
                "Пароль должен содержать хотя бы одну заглавную букву."
            )

        if not re.search(r"\d", value):
            raise serializers.ValidationError(
                "Пароль должен содержать хотя бы одну цифру."
            )

        if not re.search(r'[#@#$%^&*(),.?":{}|<>]', value):
            raise serializers.ValidationError(
                "Пароль должен содержать хотя бы один специальный символ."
            )
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
        )
        UserProfile.objects.create(user=user)
        return user


class AdminInterfaceSerializer(serializers.ModelSerializer):
    folders_count = serializers.SerializerMethodField()
    files_count = serializers.SerializerMethodField()
    files_size = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "is_staff",
            "folders_count",
            "files_count",
            "files_size",
        ]

    @staticmethod
    def get_size_formatted(size):
        for unit in ["B", "KB", "MB", "GB", "TB"]:
            if size < 1024:
                return f"{size:.2f} {unit}"
            size /= 1024
        return f"{size:.2f} PB"

    def get_folders_count(self, obj):
        return obj.folders.all().count()

    def get_files_count(self, obj):
        return obj.files.all().count()

    def get_files_size(self, obj):
        files_list = obj.files.all()
        return self.get_size_formatted(sum(file.size for file in files_list))
