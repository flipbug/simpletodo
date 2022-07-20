from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models import Tag
from ..serializers import TagSerializer
from rest_framework import permissions


class TagDetailApiView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, tag_id, *args, **kwargs):
        tag = self.get_object(tag_id, request.user.id)
        if not tag:
            return self.get_404_response()

        serializer = TagSerializer(tag)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, tag_id, *args, **kwargs):
        tag = self.get_object(tag_id, request.user.id)
        if not tag:
            return self.get_404_response()

        data = {
            'name': request.data.get('name'),
            'user': request.user.id
        }
        serializer = TagSerializer(instance=tag, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, tag_id, *args, **kwargs):
        tag = self.get_object(tag_id, request.user.id)
        if not tag:
            return self.get_404_response()

        tag.delete()
        return Response(status=status.HTTP_200_OK)

    def get_object(self, tag_id, user_id):
        try:
            return Tag.objects.get(id=tag_id, user=user_id)
        except Tag.DoesNotExist:
            return None

    def get_404_response(self):
        return Response(status=status.HTTP_404_NOT_FOUND)
