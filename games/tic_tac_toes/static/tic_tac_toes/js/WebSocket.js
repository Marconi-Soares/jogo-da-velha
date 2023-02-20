function connect_to_websocket() {
    const url = 'ws://192.168.1.64:8000/ws/tic-tac-toe/{{ room }}/'
    return new WebSocket(url)
}