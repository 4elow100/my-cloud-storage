from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    RegistrationAPIView,
    LoginAPIView,
    LogoutAPIView,
    MeAPIView,
    AdminInterfaceViewSet,
)


router = DefaultRouter()

router.register(
    r"admin_interface", AdminInterfaceViewSet, basename="admin-interface"
)

urlpatterns = [
    path("registration/", RegistrationAPIView.as_view(), name="registration"),
    path("login/", LoginAPIView.as_view(), name="login"),
    path("logout/", LogoutAPIView.as_view(), name="logout"),
    path("me/", MeAPIView.as_view(), name="me"),
    path("", include(router.urls)),
]
