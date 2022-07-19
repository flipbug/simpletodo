from pyexpat import model
from statistics import mode
from django.db import models

# Create your models here.

class ToDo(models.Model):
    text = models.TextField()
    insert_date = models.DateTimeField(auto_created=True)
    completion_date = models.DateTimeField(null=True)
    deadline = models.DateTimeField(null=True)
    is_done = models.BooleanField(default=False)

    def __str__(self):
        return self.text