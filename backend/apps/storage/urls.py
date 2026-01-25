from django.urls import path, re_path, include
from rest_framework.routers import DefaultRouter
from .views import FoldersViewSet, FileViewSet, ContentAPIView


router = DefaultRouter()
router.register(r"folders", FoldersViewSet, basename="folder")
router.register(r"files", FileViewSet, basename="file")

urlpatterns = [
    path(
        r"users/<int:id>/",
        include("apps.storage.admin_urls", namespace="admin-urls"),
    ),
    re_path(
        r"^content(/(?P<path>.*))?/$", ContentAPIView.as_view(), name="content"
    ),
    path("", include(router.urls)),
]
