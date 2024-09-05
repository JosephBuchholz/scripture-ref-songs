from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Song

class SongAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)

admin.site.register(User, UserAdmin)
admin.site.register(Song, SongAdmin)