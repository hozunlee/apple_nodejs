const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
    console.log("Connected to server 🧇");
});

socket.addEventListener("message", (message) => {
    console.log("New message ", message.data);
});

socket.addEventListener("close", () => {
    console.log("Disconnected from server 🍘");
});

setTimeout(() => {
    socket.send("hello im hojun lee");
}, 5000);
