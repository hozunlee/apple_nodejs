import http from "http";
import socketIO from "socket.io";
import { parse } from "path";
// const WebSocket = require("ws");
const express = require("express");
const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

app.listen(8080, function () {
    console.log("8080 연결되었습니다. express and node.js");
});

const httpServer = http.createServer(app);
const ioServer = socketIO(httpServer);

ioServer.on("connection", (socket) => {
    socket["nickname"] = "김익명씨";
    socket.onAny((event) => {
        console.log("event :>> ", event);
    });

    socket.on("enter_room", (roomName, done) => {
        socket.join(roomName);
        socket.to(roomName).emit("welcome", socket.nickname);
        done();
    });
    socket.on("disconnecting", () => {
        socket.rooms.forEach((room) =>
            socket.to(room).emit("bye", socket.nickname)
        );
    });

    socket.on("new_message", (msg, room, done) => {
        socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
        done();
    });

    socket.on("nickname", (nickname) => (socket["nickname"] = nickname));
});

/**
const wss = new WebSocket.Server({ server });
 * fake Database : 누군가 서버를 연결하면 그 connection을 push
 */
/* const sockets = [];

wss.on("connection", (socket) => {
    sockets.push(socket);
    socket["nickname"] = "익명씨";
    console.log("Connected to Browser 🧇");
    socket.on("close", () => console.log("Disconnected from client 🍘"));
    socket.on("message", (msg) => {
        const message = JSON.parse(msg);
        // console.log(message, msg.toString())

        switch (message.type) {
            case "new_message":
                sockets.forEach((aSocket) =>
                    aSocket.send(`${socket.nickname}: ${message.payload}`)
                );
                break;
            case "nickname":
                socket["nickname"] = message.payload;
                break;
        }
    });
}); // 가독성을 위해 콜백에 익명함수를 받음
*/

httpServer.listen(3000, () => console.log("Listening on my heart beat"));

// return;
// // 코딩애플
// const socket = new WebSocket.Server({
//     port: 8081,
// }); // 웹소켓 열기

// // 웹소켓으로 오는 유저 메세지 받으려면
// socket.on("connection", (ws, req) => {
//     ws.on("message", (msg) => {
//         console.log("유저가 보낸거 :" + msg);
//         ws.send("반사"); // 웹소켓으로 서버-> 유저 메세지 보내려면
//     });
// });

// //ws 대신 socket.io 라이브러리 쓰면
// // 연결 끊기면 자동재접속
// // 웹소켓 접속자마다 자동 id 부여
// // 모든 웹소켓유저에게 전체 메세지 전송가능
// // 웹소켓방을 생성가능
