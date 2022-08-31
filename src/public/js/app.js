const socket = io();

const welcome = document.querySelector("#welcome");
const form = welcome.querySelector("form");
const form2 = document.querySelector("#msg");

function backendDone(msg) {
    console.log(`the backend says:`, msg);
}

const handleRoomSubmit = (event) => {
    event.preventDefault();
    const input = form.querySelector("input");
    socket.emit("enter_room", input.value, backendDone);
    input.value = "";
};

form.addEventListener("submit", handleRoomSubmit);

// TODO  첫번째 이제 emit을 할 수 있다. send 말고 emit
