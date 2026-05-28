from rest_framework import viewsets, mixins, status
from rest_framework.views import APIView

from ..serializers.signup_serializer import LoginSerializer

from   ..models import Users
from   ..serializers.signup_gg_serializer import LoginGGSerializer
from   ..serializers.user_serializer import UserSerializer
from   ..views.views_signup import format_error_detail, get_error_message
from rest_framework.response import Response
from django.contrib.auth import authenticate

from rest_framework_simplejwt.tokens import RefreshToken

class SigninViewSet(viewsets.GenericViewSet):
    queryset = Users.objects.all()
    serializer_class = LoginSerializer

    def create(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(request, email=email, password=password)

        if user is not None:
            if user.auth_provider != Users.AUTH_PROVIDERS_MANUAL:
                return Response(
                    {
                        "message": "Phương thức đăng nhập không phù hợp"
                    },
                    status=status.HTTP_401_UNAUTHORIZED
                )
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "message": "Đăng nhập thành công, chuyển hướng đến Home ...",
                    "user": UserSerializer(user).data,
                    "access_token": str(refresh.access_token),
                    "refresh_token": str(refresh)
                },
                status=status.HTTP_200_OK
            )
        else:
            email_exists = Users.objects.filter(email=email).exists()
            if email_exists:
                return Response(
                    {
                        "message": "Mật khẩu không đúng hoặc phương thức đăng nhập không phù hợp"
                    },
                    status=status.HTTP_401_UNAUTHORIZED
                )
            return Response(
                {
                    "message": "Người dùng không tồn tại, vui lòng đăng ký trước"
                },
                status=status.HTTP_401_UNAUTHORIZED
            )

class SigninGGViewSet(viewsets.GenericViewSet):
    queryset = Users.objects.all()
    serializer_class = LoginGGSerializer

    def create(self, request):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
            user_info = serializer.validated_data['access_token']

            email = user_info.get("email")
            
            auth_provider = Users.AUTH_PROVIDERS_GOOGLE
            name = user_info.get("name")
            print(auth_provider, email, name)
            user = Users.objects.filter(email=email, auth_provider=auth_provider).first()
            if user is not None:
                refresh = RefreshToken.for_user(user)
                return Response(
                    {
                        "message": "Đăng nhập thành công, chuyển hướng đến Home ...",
                        "user": UserSerializer(user).data,
                        "access_token": str(refresh.access_token),
                        "refresh_token": str(refresh)
                    },
                    status=status.HTTP_200_OK
                )
            
            email_check = Users.objects.filter(email=email).first()
            if email_check is not None:
                return Response(
                    {
                        "message": "Email đã tồn tại với phương thức đăng nhập khác"
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            return Response(
                {
                    "message": "Người dùng không tồn tại, vui lòng đăng ký trước"
                },
                status=status.HTTP_404_NOT_FOUND
            )
            

        except Exception as exc:
            message = get_error_message(getattr(exc, "detail", exc))
            errors = format_error_detail(getattr(exc, "detail", message))

            return Response(
                {
                    "message": message,
                    "errors": errors
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        except ValidationError as exc:
            message = get_error_message(getattr(exc, "detail", exc))
            errors = format_error_detail(getattr(exc, "detail", message))

            return Response(
                {
                    "message": message,
                    "errors": errors
                },
                status=status.HTTP_400_BAD_REQUEST
            )