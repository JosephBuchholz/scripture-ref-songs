from django.http import HttpResponse
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
