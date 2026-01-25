from django.urls import path, re_path, include
from .views import FoldersViewSet, FileViewSet, ContentAPIView


app_name = "storage"

folder_patterns = [
    path(
        "folders/",
        FoldersViewSet.as_view(
            {
                "post": "create",
            }
        ),
        name="user-folder-create",
    ),
    re_path(
        r"^folders/(?P<pk>\d+)/$",
        FoldersViewSet.as_view({"get": "retrieve", "delete": "destroy"}),
        name="user-folder",
    ),
    re_path(
        r"^folders/(?P<pk>\d+)/rename/$",
        FoldersViewSet.as_view({"patch": "rename"}),
        name="user-folder-rename",
    ),
]

file_patterns = [
    path(
        "files/",
        FileViewSet.as_view(
            {
                "post": "create",
            }
        ),
        name="user-file-create",
    ),
    re_path(
        r"^files/(?P<pk>[a-f0-9\-]+)/$",
        FileViewSet.as_view({"get": "retrieve", "delete": "destroy"}),
        name="user-file",
    ),
    re_path(
        r"^files/(?P<pk>[a-f0-9\-]+)/rename/$",
        FileViewSet.as_view({"patch": "rename"}),
        name="user-file-rename",
    ),
    re_path(
        r"^files/(?P<pk>[a-f0-9\-]+)/get_token/$",
        FileViewSet.as_view({"get": "get_token"}),
        name="user-file-get-token",
    ),
    re_path(
        r"^files/(?P<pk>[a-f0-9\-]+)/download/$",
        FileViewSet.as_view({"get": "download"}),
        name="user-file-download",
    ),
    re_path(
        r"^files/(?P<pk>[a-f0-9\-]+)/view/$",
        FileViewSet.as_view({"get": "view"}),
        name="user-file-view",
    ),
]

urlpatterns = [
    re_path(
        r"^content/(?P<path>.*)$",
        ContentAPIView.as_view(),
        name="user-content",
    ),
]

urlpatterns += folder_patterns + file_patterns
