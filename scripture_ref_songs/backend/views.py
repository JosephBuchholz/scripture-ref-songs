from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import TAsv

"""
Gets verse from Bible database
"""
def get_verse(request):
    book = request.GET.get('b')
    chapter = request.GET.get('c')
    verse = request.GET.get('v')
    text = TAsv.objects.using("bible").get(b=book,c=chapter,v=verse).t
    return HttpResponse(text);

def get_verse_range(request):
    book = request.GET.get('b')
    chapter = request.GET.get('c')
    verse1 = request.GET.get('v1')
    verse2 = request.GET.get('v2')
    text = TAsv.objects.using("bible").get(b=book,c=chapter,v=verse1).t
    return HttpResponse(text);