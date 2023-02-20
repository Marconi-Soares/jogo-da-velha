from django.urls import path 
from .views import MainView


urlpatterns = [
    path('', MainView.as_view(), name='index'),
    path('<str:room_code>', MainView.as_view(), name='room')
]