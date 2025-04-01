const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("public"));

let messages = [];

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.emit("chatHistory", messages);

    socket.on("chatMessage", (msg) => {
        messages.push(msg); 
        io.emit("chatMessage", msg);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

server.listen(80, () => {
    console.log("Server running at http://localhost:80");
});