from django.shortcuts import render

from .serializers.otp_serializer import OtpSerializer, OtpVerifySerializer

from .serializers.signup_gg_serializer import LoginGGSerializer
from rest_framework import viewsets, mixins
from .models import Users
from .serializers.user_serializer import UserSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ErrorDetail, ValidationError
from django.core.cache import cache
from .services.UserService import UserService
from django.core.mail import send_mail
import random
from .services.EmailService import EmailService

def get_error_message(errors):
    if isinstance(errors, ErrorDetail):
        return str(errors)

    if isinstance(errors, list):
        return get_error_message(errors[0]) if errors else "Đã xảy ra lỗi"

    if isinstance(errors, dict):
        first_error = next(iter(errors.values()), None)
        return get_error_message(first_error)

    return str(errors) if errors else "Đã xảy ra lỗi"

def format_error_detail(errors):
    if isinstance(errors, dict):
        return errors

    if isinstance(errors, list):
        return {"non_field_errors": errors}

    return {"non_field_errors": [errors]}

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserSerializer

class RegisterGGViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = Users.objects.all()
    serializer_class = LoginGGSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            try:
                user = serializer.save()
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

            return Response(
                {
                    "message": "Đăng kí thành công, chuyển hướng đến Home ...",
                    "user": UserSerializer(user).data
                },
                status=status.HTTP_200_OK
            )

        first_error = get_error_message(serializer.errors)

        return Response(
            {
                "message": first_error,
                "errors": serializer.errors
            },
            status=status.HTTP_400_BAD_REQUEST
        )

class OtpViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = Users.objects.all()
    serializer_class = OtpSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        otp = random.randint(100000, 999999)

        if serializer.is_valid():
            if cache.get(serializer.validated_data["email"]):
                # print(f"cache.get(serializer.validated_data['email']): {cache.get(serializer.validated_data['email'])}")
                return Response(
                    {
                        "message": "OTP đã được gửi trước đó. Vui lòng kiểm tra email của bạn."
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )
            try:
                EmailService.send_otp_email(serializer.validated_data["email"], otp)
            except Exception as e:
                return Response(
                    {
                        "message": "Đã xảy ra lỗi khi gửi OTP."
                    },
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            
            cache.set(serializer.validated_data["email"], otp, timeout=300)

            return Response(
                {
                    "message": "OTP đã được gửi thành công."
                },
                status=status.HTTP_200_OK
            )

        first_error = get_error_message(serializer.errors)

        return Response(
            {
                "message": first_error,
                "errors": serializer.errors
            },
            status=status.HTTP_400_BAD_REQUEST
        )
    
class OtpVerifyViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = OtpVerifySerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            email = serializer.validated_data["email"]
            otp = serializer.validated_data["otp"]

            cached_otp = cache.get(email)

            if str(cached_otp) == str(otp):
                try:
                    user = UserService.create_user(
                            email=email,
                            name=serializer.validated_data["name"],
                            password=serializer.validated_data["password"],
                        )
                except ValueError as exc:
                    return Response(
                        {
                            "message": str(exc)
                        },
                        status=status.HTTP_400_BAD_REQUEST
                    )
                except IntegrityError:
                    return Response(
                        {
                            "message": "Email đã được sử dụng."
                        },
                        status=status.HTTP_400_BAD_REQUEST
                    )
                
                cache.delete(email)

                return Response(
                    {
                        "message": "OTP đã được xác minh thành công.",
                        "user": UserSerializer(user).data
                    },
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {
                        "message": "OTP không hợp lệ hoặc đã hết hạn."
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

        first_error = get_error_message(serializer.errors)

        return Response(
            {
                "message": first_error,
                "errors": serializer.errors
            },
            status=status.HTTP_400_BAD_REQUEST
        )