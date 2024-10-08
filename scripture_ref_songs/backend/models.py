from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass

class Song(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(unique=True, max_length=200)
    creators = models.CharField(max_length=1000, null=True) # comma seperated with a colon in between role and name (e.g. lyricist:john,composer:smith)
    date = models.CharField(max_length=30, null=True)
    tags = models.CharField(max_length=1000, null=True)
    song_file = models.FileField(upload_to='songs_files', null=True, blank=True)
    description_file = models.FileField(upload_to='description_files', null=True, blank=True)

    def __str__(self):
        return self.name