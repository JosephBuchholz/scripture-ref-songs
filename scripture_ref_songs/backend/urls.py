from django.urls import path
from . import views

urlpatterns = [
    path('songs/getfile', views.get_song_file, name="get_song_file"),
    path('songs/getallsongs', views.get_all_songs, name="get_all_songs"),
]