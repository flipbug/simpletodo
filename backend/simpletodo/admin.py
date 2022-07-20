import imp
from django.contrib import admin
from .models import Tag, Todo

admin.site.register(Tag)
admin.site.register(Todo)
