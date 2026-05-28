from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Profiles
from .serializers.ProifileSerializer import ProfileSerializer
from rest_framework.response import Response

class ProfileAllViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Profiles.objects.all()
    serializer_class = ProfileSerializer

class UserProfileViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer

    def list(self, request):
        user = request.user

        queryset = Profiles.objects.filter(user=user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
