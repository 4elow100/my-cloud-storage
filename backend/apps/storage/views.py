import mimetypes


from django.contrib.auth.models import User
from django.core.exceptions import PermissionDenied
from django.http import FileResponse
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.parsers import FormParser, MultiPartParser, JSONParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Folder, File
from .serializers import FolderSerializer, FileSerializer


def public_file_download(request, public_token):
    file_instance = get_object_or_404(File, public_token=public_token)
    file = file_instance.file

    response = FileResponse(file.open("rb"))
    response["Content-Disposition"] = (
        f'inline; filename="{file_instance.original_name}"'
    )
    return response


def get_target_user(request, user_id=None):
    if user_id is None:
        return request.user
    if not request.user.is_staff:
        raise PermissionDenied("Требуются права администратора")

    return get_object_or_404(User, id=user_id)


class FoldersViewSet(viewsets.ModelViewSet):
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [JSONParser]

    @property
    def target_user(self):
        if not hasattr(self, "_target_user"):
            user_id = self.kwargs.get("id")
            self._target_user = get_target_user(self.request, user_id)
        return self._target_user

    def get_queryset(self):
        return self.queryset.filter(owner=self.target_user)

    def perform_create(self, serializer):
        parent = None
        parent_id = self.request.data.get("parent")
        if parent_id:
            parent = get_object_or_404(
                Folder, id=parent_id, owner=self.target_user
            )
        serializer.save(
            owner=self.target_user,
            parent=parent,
            name=self.request.data.get("name"),
        )

    @action(detail=True, methods=["patch"])
    def rename(self, request, id=None, pk=None):
        folder_instance = self.get_object()
        new_name = request.data.get("name")

        if not new_name:
            return Response(
                {"error": "Имя не указано"}, status=status.HTTP_400_BAD_REQUEST
            )

        if (
            Folder.objects.filter(
                owner=folder_instance.owner,
                name=new_name,
                parent=folder_instance.parent,
            )
            .exclude(id=folder_instance.id)
            .exists()
        ):
            return Response(
                {"error": "Папка с таким именем уже существует"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = self.get_serializer(
            folder_instance, data={"name": new_name}, partial=True
        )

        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(
                {
                    "message": "Папка переименована",
                    "name": serializer.data["name"],
                }
            )
        except ValidationError as e:
            return Response(
                {"error": e.detail.get("name", ["Ошибка валидации"])[0]},
                status=status.HTTP_400_BAD_REQUEST,
            )


class FileViewSet(viewsets.ModelViewSet):
    queryset = File.objects.all()
    serializer_class = FileSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    lookup_value_regex = "[a-f0-9-]+"

    @property
    def target_user(self):
        if not hasattr(self, "_target_user"):
            user_id = self.kwargs.get("id")
            self._target_user = get_target_user(self.request, user_id)
        return self._target_user

    def get_queryset(self):
        return self.queryset.filter(owner=self.target_user)

    def perform_create(self, serializer):
        folder = None
        folder_id = self.request.data.get("folder_id")
        if folder_id:
            folder = get_object_or_404(
                Folder, id=folder_id, owner=self.target_user
            )
        serializer.save(
            owner=self.target_user,
            folder=folder,
            comment=self.request.data.get("comment"),
        )

    @action(detail=True, methods=["get"])
    def view(self, request, id=None, pk=None):
        file_instance = self.get_object()
        file = file_instance.file

        content_type, _ = mimetypes.guess_type(file.name)
        content_type = content_type or "application/octet-stream"

        response = FileResponse(file.open("rb"), content_type=content_type)
        response["Content-Disposition"] = (
            f'inline; filename="{file_instance.original_name}"'
        )
        return response

    @action(detail=True, methods=["patch"])
    def rename(self, request, id=None, pk=None):
        file_instance = self.get_object()
        new_name = request.data.get("name")

        if not new_name:
            return Response(
                {"error": "Имя не указано"}, status=status.HTTP_400_BAD_REQUEST
            )

        if (
            File.objects.filter(
                owner=file_instance.owner,
                original_name=new_name,
                folder=file_instance.folder,
            )
            .exclude(id=file_instance.id)
            .exists()
        ):
            return Response(
                {"error": "Файл с таким именем уже существует"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = self.get_serializer(
            file_instance, data={"original_name": new_name}, partial=True
        )

        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(
                {
                    "message": "Файл переименован",
                    "name": serializer.data["original_name"],
                }
            )
        except ValidationError as e:
            return Response(
                {
                    "error": e.detail.get(
                        "original_name", ["Ошибка валидации"]
                    )[0]
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

    @action(detail=True, methods=["get"])
    def get_token(self, request, id=None, pk=None):
        file_instance = self.get_object()
        return Response({"token": file_instance.public_token})

    @action(detail=True, methods=["get"])
    def download(self, request, id=None, pk=None):
        file_instance = self.get_object()
        file_handle = file_instance.file.open("rb")
        mime_type, _ = mimetypes.guess_type(file_instance.original_name)
        mime_type = mime_type or "application/octet-stream"
        response = FileResponse(file_handle, content_type=mime_type)
        response["Content-Disposition"] = (
            f'attachment; filename="{file_instance.original_name}"'
        )
        response["X-Content-Type-Options"] = "nosniff"

        if request.user == file_instance.owner:
            file_instance.last_download_at = timezone.now()
            file_instance.save(update_fields=["last_download_at"])
        return response


class ContentAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, path=None, id=None, *args, **kwargs):
        target_user = get_target_user(request, id)
        parent = None
        closest_existing_path = ""

        if path:
            folder_names = path.strip("/").split("/")
            try:
                for i, name in enumerate(folder_names):
                    parent = Folder.objects.get(
                        owner=target_user, name=name, parent=parent
                    )
                    closest_existing_path = "/".join(folder_names[: i + 1])
            except Folder.DoesNotExist:
                return Response(
                    {
                        "error": "FOLDER_NOT_FOUND",
                        "closest_existing_path": closest_existing_path,
                        "message": f"Папка по пути '{path}' не найдена",
                    },
                    status=status.HTTP_404_NOT_FOUND,
                )

            folders = Folder.objects.filter(owner=target_user, parent=parent).order_by("name")
            files = File.objects.filter(owner=target_user, folder=parent).order_by("original_name")
        else:
            folders = Folder.objects.filter(owner=target_user, parent=None).order_by("name")
            files = File.objects.filter(owner=target_user, folder=None).order_by("original_name")

        folders_data = FolderSerializer(folders, many=True).data
        files_data = FileSerializer(files, many=True).data
        current_folder_id = parent.id if parent else None

        return Response(
            {
                "current_folder_id": current_folder_id,
                "folders": folders_data,
                "files": files_data,
            }
        )
