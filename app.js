// setup express
const express = require("express")
const app = express()


// setup sockets
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// utilities
const path = require("path")
const fs = require('fs')
const {getArray, getCount} = require('./helper');


app.use(express.static("./public"))
const file = './watch.txt'

let fsWait = false;
fs.watch(file, async (event, filename) => {
  if (filename) {
    if (fsWait) return;
    fsWait = setTimeout(() => {
      fsWait = false;
    }, 100);

    let size = await getCount(file)
    io.emit('change', await getArray(size, file))
    console.log(`${filename} file Changed`)
  }
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

io.on('connection', async (socket) => {
  let size = await getCount(file)
  io.emit('change', await getArray(size, file))
});

server.listen(3000, () => {
    console.log("Server is listening")
})