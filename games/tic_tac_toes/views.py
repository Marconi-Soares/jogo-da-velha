from django.views.generic import TemplateView
from django.shortcuts import render
# Create your views here.

class MainView(TemplateView):
    template_name = 'tic_tac_toes/index.html'
    
    def get(self, request, *args, **kwargs):
        room = kwargs.get('room_code')

        if room is not None:
            template_name = 'tic_tac_toes/game.html'
            return render(request, template_name, {'room':room})

        return super().get(request, *args, **kwargs)