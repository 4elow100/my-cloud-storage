from django.urls import path, include
from .views import FoldersAPIView, GetFolderAPIView, UploadFileAPIView

urlpatterns = [
    path('folders/', FoldersAPIView.as_view(), name='folders'),
    path('folders/<int:pk>/', GetFolderAPIView.as_view(), name='folders-by-id'),
    # path('files/', ),
    path('files/upload/', UploadFileAPIView.as_view(), name='file-upload'),
]
