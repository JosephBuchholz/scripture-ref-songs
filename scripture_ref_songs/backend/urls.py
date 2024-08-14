from django.urls import path
from . import views

urlpatterns = [
    path('bible/getverse', views.get_verse, name="get_verse"),
]