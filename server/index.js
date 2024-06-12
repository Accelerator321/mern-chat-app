
const express = require('express');
const app = express();
const port = 80;
const path = require("path");

app.use(express.static(path.join(__dirname, '/dist')));


let s = app.listen(port,()=>console.log(`server started at port ${port}`)); 

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});


const io  = require("socket.io")(s,{
    cors:{
        pingTimeout:60000,
        // origin:'http://localhost:5500'
    
        origin:'/'
    }
});

const socketToemail = new Map();
const socketToRoom= new Map();
const emailTosocket = new Map();

io.on('connection', (socket)=>{
    console.log("We're connected ", socket.id);

    socket.on("room:join", (data)=>roomJoin(data,socket));

    socket.on("message:send", data=>sendMessage(data,socket));
    
    socket.on("disconnect",(d)=>{

        io.to(socketToRoom.get(socket.id)).emit("user:left",
        {email: socketToemail.get(socket.id)});
    })
})


const roomJoin = (data,socket)=>{
    const {roomId,email} = data;
//    console.log("room",email)

    socketToemail.set(socket.id, data.email);
    emailTosocket.set(data.email,socket.id);
  
    io.to(roomId).emit("user:joined",{email,id:socket.id});
    socket.join(roomId);
    socketToRoom.set(socket.id, roomId);

    io.to(emailTosocket.get(email)).emit("room:join",data);

}

const sendMessage= (data,socket)=>{
        let {roomId,message} = data;
        // console.log(message);
        // message = `${socketToemail.get(socket.id)} : ${message}`;

        io.to(roomId).except(socket.id).emit("message:receive", 
        {message , id:socket.id, sender:socketToemail.get(socket.id)
        });
}


