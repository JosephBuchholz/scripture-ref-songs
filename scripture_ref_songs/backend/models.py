from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass

class Song(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(unique=True, max_length=200)
    song_file = models.FileField(upload_to='songs_files', null=True)

    def __str__(self):
        return self.name