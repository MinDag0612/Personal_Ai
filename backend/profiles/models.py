from django.db import models

class Profiles(models.Model):
    user = models.OneToOneField('users.Users', on_delete=models.CASCADE)
    profession = models.CharField(max_length=255, blank=True, null=True)
    education = models.CharField(max_length=255, blank=True, null=True)
    nickname = models.CharField(max_length=255, blank=True, null=True)
    hobbies = models.TextField(blank=True, null=True)
    public_description = models.TextField(blank=True, null=True)