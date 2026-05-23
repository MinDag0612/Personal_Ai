from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OtpVerifyViewSet, OtpViewSet, RegisterGGViewSet, UserViewSet
router = DefaultRouter()

router.register(r'users', UserViewSet, basename='users')
router.register(r'register-gg', RegisterGGViewSet, basename='register-gg')
router.register(r'otp', OtpViewSet, basename='otp')
router.register(r'otp-verify', OtpVerifyViewSet, basename='otp-verify')


urlpatterns = [
    path('', include(router.urls)),
]