from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('home/', index),
    path('songlist/', index),
    path('viewsong/<int:id>/', index),
]