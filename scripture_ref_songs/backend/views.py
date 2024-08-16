from django.http import HttpResponse
from .models import TAsv
from .helper import get_bible_verse_id

"""
Gets verse from Bible database
"""
def get_verse(request):
    book = request.GET.get('b')
    chapter = request.GET.get('c')
    verse = request.GET.get('v')
    text = TAsv.objects.using("bible").get(b=book,c=chapter,v=verse).t
    return HttpResponse(text)

"""
Gets verse range from Bible database
"""
def get_verse_range(request):
    book = request.GET.get('b')
    chapter = request.GET.get('c')
    verse1 = request.GET.get('v1')
    verse2 = request.GET.get('v2')

    texts = TAsv.objects.using("bible").filter(id__range=(get_bible_verse_id(book, chapter, verse1), get_bible_verse_id(book, chapter, verse2)))

    # concatenate verses together
    text = ""
    first = True
    for v in texts:
        # add space inbetween verses
        if not first:
            text += " "
        
        text += v.t

        first = False

    return HttpResponse(text)