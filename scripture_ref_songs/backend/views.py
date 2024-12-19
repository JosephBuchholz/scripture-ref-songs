from django.http import HttpResponse, JsonResponse
from .models import Song

# gets the lyric file for the song with the given id
def get_song_file(request):
    if request.GET:
        id = request.GET.get("id")
        try:
            song = Song.objects.get(id=id)
        except Song.DoesNotExist:
            return HttpResponse(status=404)

        if song.song_file:
            with song.song_file.open() as f:
                return HttpResponse(f.read())
        else:
            return HttpResponse(status=404)

    return HttpResponse(status=400)

def get_song(request):
    """
    Gets an returns a song's basic data (title, author, etc.).
    """

    if request.GET:
        id = request.GET.get("id")
        try:
            song = Song.objects.get(id=id)
        except Song.DoesNotExist:
            return HttpResponse(status=404)
        
        songObj = { "id": song.id, "title": song.name, "creators": song.creators }
        return JsonResponse(songObj)

    return HttpResponse(status=400)

# gets and returns a list of songs from the database
def get_all_songs(request):
    songs = { "songs": [] }

    query = Song.objects.all()
    for song in query:
        songObj = { "id": song.id, "title": song.name, "creators": song.creators }
        songs["songs"].append(songObj)

    return JsonResponse(songs)