const socket = io();

const welcome = document.querySelector("#welcome");
const roomNumber = welcome.querySelector("#roomNumber");
const nameForm = welcome.querySelector("#name");
const deal = document.querySelector("#deal");

deal.addEventListener("click", () => {
    prompt("체결 가격을 입력해주세요");
});

const room = document.querySelector("#room");

room.hidden = true;

let roomName;

const addMessage = (message) => {
    const ul = room.querySelector("ul");
    const li = document.createElement("li");
    li.innerText = message;
    ul.appendChild(li);
};

const handleRoomSubmit = (event) => {
    event.preventDefault();
    const input = welcome.querySelector("#roomNumber input");
    socket.emit("enter_room", input.value, showRoom);
    roomName = input.value;
    input.value = "";
};

const handleMessageSubmit = (event) => {
    event.preventDefault();
    const input = room.querySelector("#msg input");
    const value = input.value;
    socket.emit("new_message", value, roomName, () => {
        addMessage(`You: ${value}`);
    });
    input.value = "";
};

const handleNicknameSubmit = (event) => {
    event.preventDefault();
    const input = welcome.querySelector("#name input");
    socket.emit("nickname", input.value);
};

function showRoom() {
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName}`;
    const msgForm = room.querySelector("#msg");
    msgForm.addEventListener("submit", handleMessageSubmit);
}

// TODO  첫번째 이제 emit을 할 수 있다. send 말고 emit

socket.on("welcome", (user) => {
    addMessage(`${user} joined!`);
});

socket.on("bye", (left) => {
    addMessage(`${left}, left🤣`);
});

socket.on("new_message", addMessage);

roomNumber.addEventListener("submit", handleRoomSubmit);

nameForm.addEventListener("submit", handleNicknameSubmit);
