# Generated by Django 4.2.7 on 2024-09-05 17:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_alter_song_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='song',
            name='song_file',
            field=models.FileField(null=True, upload_to='songs_files'),
        ),
    ]
