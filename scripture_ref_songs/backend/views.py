from django.http import HttpResponse
from .models import Song

def get_song_file(request):
    if request.GET:
        id = request.GET.get("id")
        song = Song.objects.get(id=id)
        if song.song_file:
            with song.song_file.open() as f:
                return HttpResponse(f.read())
        else:
            return HttpResponse("none")

    return HttpResponse("not get request")
