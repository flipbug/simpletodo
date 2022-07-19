from django.urls import path
from .views import TodoListApiView, TodoDetailApiView


app_name = 'simpletodo'

urlpatterns = [
    path('', TodoListApiView.as_view()),
    path('<int:todo_id>/', TodoDetailApiView.as_view()),
]
