from django.urls import path
from .views import (
    TodoListApiView,
    TodoDetailApiView,
    TagListApiView,
    TagDetailApiView
)


app_name = 'simpletodo'

urlpatterns = [
    path('todos/', TodoListApiView.as_view()),
    path('todos/<int:todo_id>/', TodoDetailApiView.as_view()),
    path('tags/', TagListApiView.as_view()),
    path('tags/<int:tag_id>/', TagDetailApiView.as_view()),

]
