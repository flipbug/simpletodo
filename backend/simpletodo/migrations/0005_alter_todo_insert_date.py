# Generated by Django 4.0.6 on 2022-07-19 20:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('simpletodo', '0004_alter_todo_is_done'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='insert_date',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]