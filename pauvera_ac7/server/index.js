const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const users = new Map();

io.on('connection', (socket) => {
    socket.on('register', (data) => {
        users.set(socket.id, {
            id: socket.id,
            name: data.name,
            color: data.color,
            x: 0,
            y: 0
        });
        io.emit('update-count', users.size);
    });

    socket.on('move', (coords) => {
        const user = users.get(socket.id);
        if (user) {
            user.x = coords.x;
            user.y = coords.y;
            socket.broadcast.emit('someone-moved', user);
        }
    });

    socket.on('disconnect', () => {
        users.delete(socket.id);
        io.emit('update-count', users.size);
        socket.broadcast.emit('someone-left', socket.id);
    });
});

server.listen(4322, () => console.log('Servidor listo en puerto 4322'));