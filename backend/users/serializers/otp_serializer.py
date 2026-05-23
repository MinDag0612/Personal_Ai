from rest_framework import serializers

class OtpSerializer(serializers.Serializer):
    email = serializers.EmailField()

class OtpVerifySerializer(serializers.Serializer):
    email = serializers.EmailField()
    name = serializers.CharField(max_length=255)
    password = serializers.CharField(min_length=8, max_length=255)
    otp = serializers.CharField(min_length=6, max_length=6)