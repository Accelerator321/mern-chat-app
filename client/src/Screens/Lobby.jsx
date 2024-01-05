import React, { useCallback, useEffect, useState } from "react";

import { useSocket } from "../context/socketProvider";
import { useNavigate } from "react-router-dom";

import '../css/lobby.css';
import {useAuth} from "../context/AuthProvider";
import { auth } from "../components/firebase";

const Lobby = () => {
  // const [email, setEmail] = useState("");
  const [roomId, setRoomId] = useState("");
  const socket = useSocket();
  const navigate = useNavigate();
  const user = useAuth();

  const handleSubmit = useCallback(
    (e) => {
      // console.log("lobby",user);
      // console.log(user.email)
      e.preventDefault();
      socket.emit("room:join", { email:user.email, roomId });
    },
    [ roomId, socket,user]
  );

  const handleRoomJoin = useCallback((data) => {
    console.log(data, "join request aproved");
    navigate(`/room/${roomId}`);
  });

  const handleLogOut = ()=>{
    auth.signOut();
  }

  useEffect(() => {
    socket.on("room:join", handleRoomJoin);

    return () => {
      socket.off("room:join", handleRoomJoin);
    };
  }, [socket, handleRoomJoin]);
  return (
    <div id = 'lobby'>

      <form action="" className="form_main" onSubmit={handleSubmit}>
        <p className="heading" style={{fontSize: '1.2em'}}>{user.email}</p>
        {/* <div className="inputContainer">
         
          <input
            className="inputField"
            type="email"
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div> */}
        <div className="inputContainer">
          
          

          <input
            className="inputField"
            type="text"
            id="roomId"
            placeholder="enter roomid"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            required={true}
          />
        </div>
        
        <button id="button">join</button>
        <button className="logout" onClick={handleLogOut}>Logout</button>
      </form>
    </div>
  );
};

export default Lobby;
