from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass

class BibleVersionKey(models.Model):
    table = models.TextField()
    abbreviation = models.TextField()
    language = models.TextField()
    version = models.TextField()
    info_text = models.TextField()
    info_url = models.TextField()
    publisher = models.TextField()
    copyright = models.TextField()
    copyright_info = models.TextField()

    class Meta:
        managed = False
        db_table = 'bible_version_key'


class BookInfo(models.Model):
    order = models.AutoField(primary_key=True)
    title_short = models.TextField(unique=True)
    title_full = models.TextField(unique=True)
    abbreviation = models.TextField(unique=True)
    category = models.TextField()
    otnt = models.TextField()
    chapters = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'book_info'


class CrossReference(models.Model):
    vid = models.IntegerField()
    r = models.IntegerField()
    sv = models.IntegerField()
    ev = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'cross_reference'


"""
class KeyAbbreviationsEnglish(models.Model):
    a = models.CharField()
    b = models.SmallIntegerField()
    p = models.TextField()  # This field type is a guess.

    class Meta:
        managed = False
        db_table = 'key_abbreviations_english'


class KeyEnglish(models.Model):
    b = models.AutoField(primary_key=True)
    n = models.TextField()
    t = models.CharField()
    g = models.TextField()  # This field type is a guess.

    class Meta:
        managed = False
        db_table = 'key_english'


class KeyGenreEnglish(models.Model):
    g = models.TextField(primary_key=True)  # This field type is a guess.
    n = models.CharField()

    class Meta:
        managed = False
        db_table = 'key_genre_english'
"""

class TAsv(models.Model):
    b = models.IntegerField()
    c = models.IntegerField()
    v = models.IntegerField()
    t = models.TextField()

    class Meta:
        managed = False
        db_table = 't_asv'


class TBbe(models.Model):
    b = models.IntegerField()
    c = models.IntegerField()
    v = models.IntegerField()
    t = models.TextField()

    class Meta:
        managed = False
        db_table = 't_bbe'


class TKjv(models.Model):
    b = models.IntegerField()
    c = models.IntegerField()
    v = models.IntegerField()
    t = models.TextField()

    class Meta:
        managed = False
        db_table = 't_kjv'


class TWeb(models.Model):
    b = models.IntegerField()
    c = models.IntegerField()
    v = models.IntegerField()
    t = models.TextField()

    class Meta:
        managed = False
        db_table = 't_web'


class TYlt(models.Model):
    b = models.IntegerField()
    c = models.IntegerField()
    v = models.IntegerField()
    t = models.TextField()

    class Meta:
        managed = False
        db_table = 't_ylt'