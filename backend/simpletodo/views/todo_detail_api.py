from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models import Todo
from ..serializers import TodoSerializer
from rest_framework import permissions


class TodoDetailApiView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, todo_id, *args, **kwargs):
        todo = self.get_object(todo_id, request.user.id)
        if not todo:
            return self.get_404_response()

        serializer = TodoSerializer(todo)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, todo_id, *args, **kwargs):
        todo = self.get_object(todo_id, request.user.id)
        if not todo:
            return self.get_404_response()

        data = {
            'text': request.data.get('text'),
            'is_done': request.data.get('is_done'),
            'deadline': request.data.get('deadline'),
            'user': request.user.id
        }
        serializer = TodoSerializer(instance=todo, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, todo_id, *args, **kwargs):
        todo = self.get_object(todo_id, request.user.id)
        if not todo:
            return self.get_404_response()

        todo.delete()
        return Response(status=status.HTTP_200_OK)

    def get_object(self, todo_id, user_id):
        try:
            return Todo.objects.get(id=todo_id, user=user_id)
        except Todo.DoesNotExist:
            return None

    def get_404_response(self):
        return Response(status=status.HTTP_404_NOT_FOUND)
