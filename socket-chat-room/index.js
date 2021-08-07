const express = require("express");
const app = express();
const expressServer = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(expressServer);

io.on("connection", (socket) => {
    socket.join('kitchen-room');
    const sizeOfKitchen = io.sockets.adapter.rooms.get('kitchen-room').size;
    console.log(sizeOfKitchen);
    
    io.sockets.in('kitchen-room').emit('cocking', 'Rice cooking = ' +  sizeOfKitchen);
    io.sockets.in('kitchen-room').emit('boiling', 'boiling water');

    socket.join('bed-room');
    io.sockets.in('bed-room').emit('slipping', 'slipping cooking');
    io.sockets.in('bed-room').emit('rest', 'I am taking rest');

});

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

expressServer.listen(4000, () => {
	console.log("server listening on port 4000");
});
// expressServer.listen( process.env.PORT || 4000)