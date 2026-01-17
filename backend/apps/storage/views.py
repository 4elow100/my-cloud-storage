import mimetypes

from django.http import FileResponse, Http404
from django.shortcuts import get_object_or_404
from django.template.context_processors import request
from django.template.defaulttags import comment
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Folder, File
from .serializers import CreateFolderSerializer, FolderSerializer, FileSerializer


class FoldersAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, path=None):
        parent = None
        closest_existing_path = ""

        if path:
            folder_names = path.strip('/').split('/')
            try:
                for i, name in enumerate(folder_names):
                    parent = Folder.objects.get(owner=request.user, name=name, parent=parent)
                    closest_existing_path = "/".join(folder_names[:i + 1])
            except Folder.DoesNotExist:
                return Response({
                    "error": "FOLDER_NOT_FOUND",
                    "closest_existing_path": closest_existing_path,
                    "message": f"Папка по пути '{path}' не найдена"
                }, status=status.HTTP_404_NOT_FOUND)

            folders = Folder.objects.filter(owner=request.user, parent=parent)
            files = File.objects.filter(owner=request.user, folder=parent)
        else:
            folders = Folder.objects.filter(owner=request.user, parent=None)
            files = File.objects.filter(owner=request.user, folder=None)

        folders_data = FolderSerializer(folders, many=True).data
        files_data = FileSerializer(files, many=True).data
        current_folder_id = parent.id if parent else None

        return Response({
            "current_folder_id": current_folder_id,
            "folders": folders_data,
            "files": files_data
        })

    def post(self, request):
        serializer = CreateFolderSerializer(
            data=request.data,
            context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"message": "Папка успешно создана"},
            status=status.HTTP_201_CREATED
        )


class FileViewSet(viewsets.ModelViewSet):
    queryset = File.objects.all()
    serializer_class = FileSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        return self.queryset.filter(owner=self.request.user)

    def perform_create(self, serializer):
        folder = None
        folder_id = self.request.data.get("folder_id")
        if folder_id:
            folder = get_object_or_404(Folder, id=folder_id, owner=self.request.user)
        serializer.save(owner=self.request.user, folder=folder, comment=self.request.data.get("comment"))

    @action(detail=True, methods=['get'])
    def view(self, request, pk=None):
        file_instance = self.get_object()
        file = file_instance.file

        content_type, _ = mimetypes.guess_type(file.name)
        content_type = content_type or 'application/octet-stream'

        response = FileResponse(file.open('rb'), content_type=content_type)
        response['Content-Disposition'] = f'inline; filename="{file_instance.original_name}"'
        return response

    @action(detail=True, methods=['patch'])
    def rename(self, request, pk=None):
        file_instance = self.get_object()
        new_name = request.data.get("name")
        if not new_name:
            return Response({"error": "Имя не указано"}, status=status.HTTP_400_BAD_REQUEST)
        file_instance.original_name = new_name
        file_instance.save()
        return Response({"message": "Файл переименован", "name": file_instance.original_name})

    @action(detail=True, methods=['get'])
    def download(self, request, pk=None):
        file_instance = self.get_object()
        file = file_instance.file

        response = FileResponse(file.open('rb'), content_type='application/octet-stream')
        response['Content-Disposition'] = (
            f'attachment; filename="{file_instance.original_name}"'
        )
        return response


