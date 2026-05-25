import os
from urllib import response

from rest_framework import serializers
import requests
from dotenv import load_dotenv

from ..models import Users

load_dotenv("backend/.env")

class LoginGGSerializer(serializers.Serializer):
    access_token = serializers.CharField(required=True)

    def validate_access_token(self, value):
        try:
            response = requests.get(
                "https://www.googleapis.com/oauth2/v3/userinfo",
                headers={"Authorization": f"Bearer {value}"}
            )

            print("STATUS:", response.status_code)
            print("BODY:", response.text) 

            if response.status_code != 200:
                message = "Google token không hợp lệ"

                try:
                    error_data = response.json()
                    message = (
                        error_data.get("error_description")
                        or error_data.get("error")
                        or message
                    )
                except ValueError:
                    message = response.text or message

                raise serializers.ValidationError(message)

            token_info = response.json()

            return token_info

        except serializers.ValidationError:
            raise
        
        except Exception as e:
            # print(f"Error occurred while validating Google token: {e}")
            raise serializers.ValidationError("Không thể xác thực Google token")

    def create(self, validated_data):
        user_info = validated_data['access_token']
        name = user_info.get("name", "")
        email = user_info.get("email")
        auth_provider = Users.AUTH_PROVIDERS_GOOGLE

        if Users.objects.filter(email=email).exists():
            raise serializers.ValidationError("Email already exists")

        user = Users(
            email=email,
            name=name,
            auth_provider=auth_provider
        )

        user.set_unusable_password()
        user.save()
        return user
