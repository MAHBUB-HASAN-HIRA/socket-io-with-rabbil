const express = require("express");
const app = express();
const expressServer = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(expressServer);

const buyNsp = io.of("/buy");
buyNsp.on("connection", (socket) => {
	buyNsp.emit("buyNspData", 'hi Mahbub');

	console.log("New User Connected at buy Nsp");
	buyNsp.on("disconnect", () => {
		console.log("disconnected");
	});
});

const sellNsp = io.of("/sell");
sellNsp.on("connection", (socket) => {
	sellNsp.emit("sellNspData", 'hi hira');

	console.log("New User Connected at sellNsp");
	sellNsp.on("disconnect", () => {
		console.log("disconnect at sellNsp");
	});
});

// io.on("connection", (socket) => {
// 	socket.on("sendChat", (payload) => {
// 		io.emit("returnChat", payload);
// 	});

// 	console.log("New User Connected");
// 	socket.on("disconnect", () => {
// 		console.log("disconnect");
// 	});
// });

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

expressServer.listen(4000, () => console.log("server is ready at 4000"));
