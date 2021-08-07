const express = require("express");
const app = express();
const expressServer = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(expressServer, { cors: "*" });
const path = require("path");

io.on("connection", (socket) => {
	console.log("New User Connected");
	setInterval(() => {
		socket.emit("msg", "Hi Mahbub Hasan " + new Date().toLocaleDateString());
	}, 10000);
	socket.on("disconnect", () => console.log("User disconnected"));
});

app.use(express.static("../client/build"));

app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.get("/server", function (req, res) {
	res.send("Hello, World!");
});

expressServer.listen(4000, () => console.log("server listening on port 4000"));
