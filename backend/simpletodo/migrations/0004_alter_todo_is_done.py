# Generated by Django 4.0.6 on 2022-07-19 20:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('simpletodo', '0003_alter_todo_insert_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='is_done',
            field=models.BooleanField(blank=True, default=False),
        ),
    ]
