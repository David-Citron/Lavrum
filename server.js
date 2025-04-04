const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("public"));

class ChatRoom {
    constructor(id)
    {
        this.id = id;
        this.messages = [];
    }
    addMessage(message)
    {
        this.messages.push(message);
    }
    getAllMessages()
    {
        return this.messages;
    }
}

let defaultRoom = new ChatRoom(1);

io.on("connection", (socket) => {
    socket.join(defaultRoom.id);
    console.log("A user connected");

    socket.to(defaultRoom.id).emit("chatHistory", defaultRoom.getAllMessages());

    socket.on("chatMessage", ({ username, msg }) => {
        const messageData = { username, msg };
        defaultRoom.addMessage(messageData);
        io.to(defaultRoom.id).emit("chatMessage", messageData);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

server.listen(80, () => {
    console.log("Server running at http://localhost:80");
});