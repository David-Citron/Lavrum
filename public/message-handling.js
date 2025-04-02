document.addEventListener("DOMContentLoaded", () => {
    const socket = io();
    const form = document.getElementById("chat-form");
    const input = document.getElementById("chat-input");
    const messagesDiv = document.getElementById("messages");

    // Load chat history
    socket.on("chatHistory", (messages) => {
        messages.forEach((msg) => addMessage(msg));
    });

    // Add new message to chat
    socket.on("chatMessage", (msg) => {
        addMessage(msg);
    });

    // Handle form submission
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (input.value.trim()) {
            socket.emit("chatMessage", input.value);
            input.value = "";
        }
    });

    // Function to add a message to the chat
    function addMessage(msg) {
        messagesList = document.getElementById("messages");
        const messageHTML = '<div class="message"><p>' + msg + '</p></div>';
        messagesList.insertAdjacentHTML("beforeend", messageHTML);
        messagesList.scrollTop = messagesDiv.scrollHeight;
    }
});