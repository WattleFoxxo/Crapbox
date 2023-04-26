const express = require('express')
const http = require('http')
const path = require('path')
const { Server } = require("socket.io");

const app = express()
const server = http.createServer(app)
const io = new Server(server); 

const port = 3000

//Web Server

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
})

app.get('/join', (req, res) => {
    res.sendFile(path.join(__dirname, "public/join.html"))
})

app.get('/host', (req, res) => {
    res.sendFile(path.join(__dirname, "public/host.html"))
})

app.use('/static', express.static(path.join(__dirname, "public")))

//Socket IO

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('createLobby', (data) => {
        var gameid = Date.now().toString(36)
        console.log(`New lobby with id: ${gameid}`)
        io.emit('createdLobby', {"id":gameid});
        socket.join(gameid);
    });
});

server.listen(port, () => {
    console.log(`Crapbox listening on port ${port}`)
})
