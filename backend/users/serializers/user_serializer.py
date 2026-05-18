from rest_framework import serializers
from ..models import Users

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id', 'email', 'name', 'avatar_url', 'created_at']
        read_only_fields = ['created_at']