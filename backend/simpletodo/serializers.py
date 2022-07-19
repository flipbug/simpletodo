from rest_framework import serializers
from .models import Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = [
            "id", 
            "text", 
            "insert_date", 
            "update_date", 
            "completion_date", 
            "deadline",
             "is_done", 
             "user"]
