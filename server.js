const express = require("express");
const app = express();

app.use("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function () {
    console.log("8080 연결되었습니다.");
});

const WebSocket = require("ws");

const socket = new WebSocket.Server({
    port: 8081,
}); // 웹소켓 열기

// 웹소켓으로 오는 유저 메세지 받으려면
socket.on("connection", (ws, req) => {
    ws.on("message", (msg) => {
        console.log("유저가 보낸거 :" + msg);
        ws.send("반사"); // 웹소켓으로 서버-> 유저 메세지 보내려면
    });
});

//ws 대신 socket.io 라이브러리 쓰면
// 연결 끊기면 자동재접속
// 웹소켓 접속자마다 자동 id 부여
// 모든 웹소켓유저에게 전체 메세지 전송가능
// 웹소켓방을 생성가능
