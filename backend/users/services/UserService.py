from ..models import Users


class UserService:
    @staticmethod
    def create_user(email, name, password):
        if Users.objects.filter(email=email).exists():
            raise ValueError("Email đã tồn tại")

        return Users.objects.create_user(
            email=email,
            name=name,
            password=password,
            auth_provider=Users.AUTH_PROVIDERS_MANUAL
        )