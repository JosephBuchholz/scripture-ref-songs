# Generated by Django 4.2.7 on 2024-08-17 00:00

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BibleVersionKey',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('table', models.TextField()),
                ('abbreviation', models.TextField()),
                ('language', models.TextField()),
                ('version', models.TextField()),
                ('info_text', models.TextField()),
                ('info_url', models.TextField()),
                ('publisher', models.TextField()),
                ('copyright', models.TextField()),
                ('copyright_info', models.TextField()),
            ],
            options={
                'db_table': 'bible_version_key',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='BookInfo',
            fields=[
                ('order', models.AutoField(primary_key=True, serialize=False)),
                ('title_short', models.TextField(unique=True)),
                ('title_full', models.TextField(unique=True)),
                ('abbreviation', models.TextField(unique=True)),
                ('category', models.TextField()),
                ('otnt', models.TextField()),
                ('chapters', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'book_info',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='CrossReference',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vid', models.IntegerField()),
                ('r', models.IntegerField()),
                ('sv', models.IntegerField()),
                ('ev', models.IntegerField()),
            ],
            options={
                'db_table': 'cross_reference',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='TAsv',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('b', models.IntegerField()),
                ('c', models.IntegerField()),
                ('v', models.IntegerField()),
                ('t', models.TextField()),
            ],
            options={
                'db_table': 't_asv',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='TBbe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('b', models.IntegerField()),
                ('c', models.IntegerField()),
                ('v', models.IntegerField()),
                ('t', models.TextField()),
            ],
            options={
                'db_table': 't_bbe',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='TKjv',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('b', models.IntegerField()),
                ('c', models.IntegerField()),
                ('v', models.IntegerField()),
                ('t', models.TextField()),
            ],
            options={
                'db_table': 't_kjv',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='TWeb',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('b', models.IntegerField()),
                ('c', models.IntegerField()),
                ('v', models.IntegerField()),
                ('t', models.TextField()),
            ],
            options={
                'db_table': 't_web',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='TYlt',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('b', models.IntegerField()),
                ('c', models.IntegerField()),
                ('v', models.IntegerField()),
                ('t', models.TextField()),
            ],
            options={
                'db_table': 't_ylt',
                'managed': False,
            },
        ),
    ]
