document.addEventListener("DOMContentLoaded", () => {
    const socket = io();
    const form = document.getElementById("chat-form");
    const input = document.getElementById("chat-input");
    const messagesDiv = document.getElementById("messages");

    // Ask for the username (or get it from a login system)
    let username = prompt("Enter your username:").trim();
    if (!username) username = "Anonymous"; // Default name if empty

    // Load chat history
    socket.on("chatHistory", (messages) => {
        messages.forEach((msg) => addMessage(msg));
    });

    // Add new message to chat
    socket.on("chatMessage", (data) => {
        addMessage(data);
    });

    // Handle form submission
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (input.value.trim()) {
            socket.emit("chatMessage", { username, msg: input.value });
            input.value = "";
        }
    });

    // Function to add a message to the chat
    function addMessage(data) {
        messagesList = document.getElementById("messages");
        let messageHTML = '';
        if (data.username == username)
        {
            messageHTML = '<div class="message-container message-sent"><div class="message"><p><strong>' + data.username + ': </strong>' + data.msg + '</p></div></div>';
        }
        else 
        {
            messageHTML = '<div class="message-container message-received"><div class="message"><p><strong>' + data.username + ': </strong>' + data.msg + '</p></div></div>';
        }
        messagesList.insertAdjacentHTML("beforeend", messageHTML);
        messagesList.scrollTop = messagesDiv.scrollHeight;
    }
});