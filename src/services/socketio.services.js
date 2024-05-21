import { io } from 'socket.io-client'

class SocketServices{
    socket;
    constructor(){}

    setupSocketConnection(){
        this.socket = io('http://localhost:3000')
    }
}

export default new SocketServices();