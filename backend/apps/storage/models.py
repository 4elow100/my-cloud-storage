import uuid
from django.conf import settings
from django.contrib.auth.models import User
from django.db import models


def user_file_path(instance, filename):
    base, ext = filename.rsplit(".", 1)
    storage_uuid = instance.owner.profile.storage_uuid
    return f"user_files/{storage_uuid}/{uuid.uuid4()}.{ext}"


class Folder(models.Model):
    name = models.CharField(max_length=255)
    parent = models.ForeignKey(
        "self",
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="children",
    )
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="folders"
    )
    created_at = models.DateTimeField(auto_now_add=True)


class File(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    folder = models.ForeignKey(
        "Folder",
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="files",
    )
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="files",
    )
    original_name = models.CharField(max_length=255)
    file = models.FileField(upload_to=user_file_path)
    size = models.BigIntegerField()
    uploaded_at = models.DateTimeField(auto_now_add=True)
    last_download_at = models.DateTimeField(null=True, blank=True)
    comment = models.TextField(blank=True)
    public_token = models.UUIDField(
        default=uuid.uuid4, unique=True, null=True, blank=True
    )

    def __str__(self):
        return self.original_name
