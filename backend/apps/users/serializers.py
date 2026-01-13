import os

from rest_framework import serializers
from django.contrib.auth.models import User

from .models import UserProfile


class RegistrationSerializer(serializers.Serializer):
    username = serializers.CharField(min_length=3)
    first_name = serializers.CharField(min_length=3)
    last_name = serializers.CharField(min_length=3)
    password = serializers.CharField(min_length=8, write_only=True)
    email = serializers.EmailField()

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Пользователь уже существует")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        UserProfile.objects.create(user=user)
        return user


