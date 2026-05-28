from django.urls import path, include
from rest_framework.routers import DefaultRouter

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from .views.views_signin import SigninGGViewSet, SigninViewSet
from .views.views_signup import OtpVerifyViewSet, OtpViewSet, RegisterGGViewSet, UserViewSet
router = DefaultRouter()

router.register(r'users', UserViewSet, basename='users')

router.register(r'register-gg', RegisterGGViewSet, basename='register-gg')
router.register(r'otp', OtpViewSet, basename='otp')
router.register(r'otp-verify', OtpVerifyViewSet, basename='otp-verify')

router.register(r'signin-gg', SigninGGViewSet, basename='signin-gg')
router.register(r'signin', SigninViewSet, basename='signin')

urlpatterns = [
    path('', include(router.urls)),
    path('jwt-refresh/', TokenRefreshView.as_view()),
]   