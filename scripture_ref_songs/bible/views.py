from django.http import HttpResponse, JsonResponse
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
    verseNumbers = bool(request.GET.get('verseNumbers'))

    texts = TAsv.objects.using("bible").filter(id__range=(get_bible_verse_id(book, chapter, verse1), get_bible_verse_id(book, chapter, verse2)))

    # concatenate verses together
    text = ""
    first = True
    currentVerse = int(verse1)
    for v in texts:
        # add space inbetween verses
        if not first:
            text += " "
        
        if verseNumbers:
            text += f"[{currentVerse}]"
        
        text += v.t

        first = False
        currentVerse += 1;

    return HttpResponse(text)

"""
Gets a whole chapter from Bible database
"""
def get_chapter(request):
    book = request.GET.get('b')
    chapter = request.GET.get('c')
    verseNumbers = bool(request.GET.get('verseNumbers'))
    concatenate = bool(request.GET.get('concatenate'))

    verses = TAsv.objects.using("bible").filter(b=book, c=chapter)

    first = True
    currentVerse = int(1)

    # concatenate verses together
    if not concatenate:
        text = ""
        for v in verses:
            # add space inbetween verses
            if not first:
                text += " "
            
            if verseNumbers:
                text += f"[{currentVerse}]"
            
            text += v.t

            first = False
            currentVerse += 1

        return HttpResponse(text)
    else:
        textList = []
        for v in verses:
            textVerse = ""

            # add space inbetween verses
            if not first:
                textVerse += " "
            
            if verseNumbers:
                textVerse += f"[{currentVerse}]"
            
            textVerse += v.t

            first = False
            currentVerse += 1
            textList.append(textVerse)

        return JsonResponse({ "verses": textList })