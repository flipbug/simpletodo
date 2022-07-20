from rest_framework import serializers
from .models import Todo, Tag


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
            "user",
            "tags"]


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = [
            "id",
            "name",
            "user"]
