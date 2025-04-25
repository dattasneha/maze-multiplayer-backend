import http from 'http'
import express from 'express'
import { Server } from 'socket.io';


const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
app.get('/', (req, res) => {
    res.send(
        `<h1>Welcome to Maze-solver backend</h1>`
    );
  });
io.on('connection',(socket) => {
    const clientIp = socket.handshake.address;
    console.log(`A user connected from IP: ${clientIp}`);
  
    socket.on('create-room', () => {
        const roomCode = Math.random().toString(36).substring(2,8).toUpperCase();
        socket.join(roomCode);
        io.to(roomCode).emit('room-created',roomCode);
    });

    socket.on('join-room', (roomCode) => {
        
        const roomExists = io.sockets.adapter.rooms.has(roomCode);
    
        if(roomExists) {
            socket.join(roomCode);
            socket.emit('room-joined', roomCode)
        }else {
            socket.join('room-not-found')
        }
    });

    socket.on('disconnect', () => {
        console.log(`A user disconnected from IP: ${clientIp}`);
    })
})
  
server.listen(4004, () => console.log(`Server started at port 4004`));