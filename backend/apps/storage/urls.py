from django.urls import path, re_path, include
from rest_framework.routers import DefaultRouter

from .views import FoldersAPIView, FileViewSet

router = DefaultRouter()
router.register(r'files', FileViewSet, basename='files')

urlpatterns = [
    re_path(r'^folders(?:/(?P<path>.*))?/$', FoldersAPIView.as_view(), name='folders'),
    path('', include(router.urls)),
]
