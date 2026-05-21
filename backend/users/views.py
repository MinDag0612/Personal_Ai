from django.shortcuts import render
from .serializers.register_serializer import RegisterSerializer
from rest_framework import viewsets, mixins
from .models import Users
from .serializers.user_serializer import UserSerializer
from rest_framework.response import Response
from rest_framework import status

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserSerializer

class RegisterUserViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = Users.objects.all()
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(
                {
                    "message": "Đăng kí thành công"
                },
                status=status.HTTP_201_CREATED
            )

        first_error = next(iter(serializer.errors.values()))[0]

        return Response(
            {
                "message": first_error,
                "errors": serializer.errors
            },
            status=status.HTTP_400_BAD_REQUEST
        )