import http from 'http'
import express from 'express'
import { Server } from 'socket.io';


const app = express()
const server = http.createServer(app)
const io = new Server(server);

app.get('/', (req, res) => {
    res.send(
        `<h1>Hello world</h1>
        <script src="/socket.io/socket.io.js"></script>
        <script>
          const socket = io();
    
          socket.on('connect', () => {
            console.log('Connected to server!');
          });
        </script>`
    );
  });
io.on('connection',(socket) => {
    console.log("A user connected!");
})
  
server.listen(4002, () => console.log(`Server started at port 4002`));