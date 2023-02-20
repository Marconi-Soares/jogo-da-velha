from django.urls import path 
from .consumers import TicTacToeWebConsumer


ws_urlpatterns = [
    path('ws/tic-tac-toe/<str:room_name>/', TicTacToeWebConsumer.as_asgi()),
]