# Generated by Django 4.2.7 on 2024-09-05 17:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_song_song_file'),
    ]

    operations = [
        migrations.AlterField(
            model_name='song',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]