from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Todo(models.Model):
    text = models.TextField()
    insert_date = models.DateTimeField(
        auto_now_add=True, auto_now=False, blank=True)
    update_date = models.DateTimeField(auto_now=True, blank=True)
    completion_date = models.DateTimeField(null=True, blank=True)
    deadline = models.DateTimeField(null=True, blank=True)
    is_done = models.BooleanField(default=False, blank=True)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.text
