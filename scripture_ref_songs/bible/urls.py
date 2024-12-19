from django.urls import path
from . import views

urlpatterns = [
    path('bible/getverse', views.get_verse, name="get_verse"),
    path('bible/getverserange', views.get_verse_range, name="get_verse"),
    path('bible/getchapter', views.get_chapter, name="get_chapter"),
]