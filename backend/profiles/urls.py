from rest_framework.routers import DefaultRouter

from .views import ProfileAllViewSet, UserProfileViewSet
from django.urls import path, include
import rest_framework_simplejwt.views as TokenRefreshView

router = DefaultRouter()

router.register(r'profiles', ProfileAllViewSet, basename='profiles')
router.register(r'user-profile', UserProfileViewSet, basename='user-profile')

urlpatterns = [
    path('', include(router.urls)),
]