from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterUserViewSet, UserViewSet

router = DefaultRouter()

router.register(r'users', UserViewSet, basename='users')
router.register(r'register', RegisterUserViewSet, basename='register')

urlpatterns = [
    path('', include(router.urls)),
]