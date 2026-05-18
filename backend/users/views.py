from django.shortcuts import render
from .serializers.register_serializer import RegisterSerializer
from rest_framework import viewsets, mixins
from .models import Users
from .serializers.user_serializer import UserSerializer

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserSerializer

class RegisterUserViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = Users.objects.all()
    serializer_class = RegisterSerializer