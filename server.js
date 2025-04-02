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

    socket.on("chatMessage", ({ username, msg }) => {
        const messageData = { username, msg };
        messages.push(messageData);
        io.emit("chatMessage", messageData);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

server.listen(80, () => {
    console.log("Server running at http://localhost:80");
});