from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models


class UserManager(BaseUserManager):
    def create_user(self, email, name, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")

        email = self.normalize_email(email)

        user = self.model(
            email=email,
            name=name,
            **extra_fields
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, name, password, **extra_fields)


class Users(AbstractBaseUser, PermissionsMixin):
    AUTH_PROVIDERS_MANUAL = "manual"
    AUTH_PROVIDERS_GOOGLE = "google"

    AUTH_PROVIDERS = [
        (AUTH_PROVIDERS_MANUAL, "Manual"),
        (AUTH_PROVIDERS_GOOGLE, "Google"),
    ]

    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    avatar_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    auth_provider = models.CharField(max_length=50, choices=AUTH_PROVIDERS, default=AUTH_PROVIDERS_MANUAL)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.email