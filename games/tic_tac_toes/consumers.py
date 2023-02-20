from channels.generic.websocket import AsyncJsonWebsocketConsumer

class TicTacToeWebConsumer(AsyncJsonWebsocketConsumer):


    async def connect(self):
        await self.enter_room()
        await self.accept()
        await self.channel_layer.group_send(self.room_name, {
            'type':"start_game",
            'message':''
        })

    async def enter_room(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.groups.append(self.room_name)
        await self.channel_layer.group_add(self.room_name, self.channel_name)
        

    async def receive_json(self, content):
        await self.channel_layer.group_send(self.room_name, {
            'type':"make_play",
            'message':content
        })

    async def make_play(self, event):
        place = event['message']
        await self.send_json(place)
        
    async def start_game(self, event):
        msg = {'status':'connected'}
        await self.send_json(msg)

