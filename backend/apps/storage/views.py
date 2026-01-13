from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Folder
from .serializers import CreateFolderSerializer, FolderSerializer, FileSerializer


class FoldersAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        folders = Folder.objects.filter(owner=request.user)
        return Response({
            "folders": folders
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


class GetFolderAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        folder = get_object_or_404(
            Folder,
            pk=pk,
            owner=request.user
        )
        serializer = FolderSerializer(folder)
        return Response(serializer.data)


class UploadFileAPIView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        serializer = FileSerializer(
            data=request.data,
            context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        file_instance = serializer.save()
        return Response(
            {
                "id": file_instance.id,
                "name": file_instance.original_name,
                "folder": file_instance.folder.id if file_instance.folder else None
            },
            status=status.HTTP_201_CREATED
        )
