var socket = io();

var gameID = "null"

socket.on("createdLobby", function(data) {
    gameID = data.id
    document.getElementById("GameID").innerText = "Game ID: "+gameID
    //socket.sockets.in(room).emit('event', data);
});

socket.on("userConnection", function(data) {
    document.getElementById("GameID").innerText = "Game ID: "+gameID
    //socket.sockets.in(room).emit('event', data);
});

window.onload = socket.emit("createLobby")