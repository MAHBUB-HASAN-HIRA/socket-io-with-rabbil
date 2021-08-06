const express = require("express");
const app = express();
const expressServer = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(expressServer);

io.on("connection", (socket) => {
    socket.on('chat', payload => {
        io.emit('chat_transfer', payload);
    })
});

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

// expressServer.listen(4000, () => {
// 	console.log("server listening on port 4020");
// });
expressServer.listen( process.env.PORT || 4000)