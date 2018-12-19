const express = require('express');
const bodyParser = require('body-parser');
const socket = require('socket.io');
const cors = require('cors');
const message = require('./model/message');
const path = require('path')

message.setFileDir(path.join(__dirname, './data/chat_msj.txt'));

// express 
const app = new express();
app.use(bodyParser.json());
app.use(cors());

app.get('/chat', async (req, res) => {
    let output = await message.getMsjs();
    res.send(output);
});

var server = app.listen(4000, () => console.log('<START: port 4000>'));

// Socket.io

var io = socket(server);

io.on("connection", (socket) => {
    console.log("Conectado al socket con el ID:" + socket.id);

    socket.on("chat", async (chat) => {
        console.log("New Msj: ", chat);
        let response = await message.addMsj(JSON.stringify(chat));
        socket.emit("chat", chat);
    });
});
