import React, { useEffect, useState, useRef } from "react";

import { useSocket } from "../context/socketProvider";
import { useParams } from "react-router-dom";
import Alert from "../Elements/Alert";
import Message from "../Elements/Message";
import logo from "../assets/logo.png";
import ScrollToBottom from "react-scroll-to-bottom";

const RoomPage = () => {
  const socket = useSocket();
  const { roomId } = useParams();

  const [chatBody, setChatBody] = useState([
    { type: "alert", data: `you joined` },
  ]);

  const [text, setText] = useState("");

  // console.log("start",chatBody);

  const handleUserJoined = async ({ email, id }) => {
    console.log(`${email} joined room`);

    setChatBody((chatBody) => [
      ...chatBody,
      { type: "alert", data: `${email} joined`, color: " " },
    ]);
  };

  const handleUserLeft = ({ email }) => {
    console.log(`${email} left the room`);

    setChatBody((chatBody) => [
      ...chatBody,
      { type: "alert", data: `${email} left`, color: "red" },
    ]);
  };

  const handleSendMessage = (ev) => {
    // console.log(text, "sending");

    socket.emit("message:send", { message: text, roomId });
    setText((text)=>"");

    setChatBody((chatBody) => [
      ...chatBody,
      { type: "message", data: `${text}`, position: "right" },
    ]);
   
  };

  const receiveMessage = (data) => {
    let { message, id, sender } = data;
    setChatBody((chatBody) => [
      ...chatBody,
      { type: "message", data: `${message}`, position: " ", sender: sender },
    ]);
  };

 

  const handleKeyUP = (event)=>{
    // console.log(event.keyCode);
    if(event.keyCode === 13){
      handleSendMessage();
      setText("");
      return;
    }
    
  }
  const handleLogOut = ()=>{
    auth.signOut();
  }

  useEffect(() => {
    socket.on("user:left", handleUserLeft);
    socket.on("user:joined", handleUserJoined);
    socket.on("message:receive", receiveMessage);

    return () => {
      socket.off("message:receive", receiveMessage);
      socket.off("user:left", handleUserLeft);
      socket.off("user:joined", handleUserJoined);
    };
  }, [socket]);

  useEffect(()=>{
    const element = document.getElementsByClassName('chatbox')[0];
    element.scrollTop = element.scrollHeight;
  },[chatBody])
  return (
    <>
      {/* <div className="container"> */}
        <div className="chatroom">
          <div className="bar">
            <img src={logo} alt="" />
            <div style={{margin:"auto 3px"}}>Tinkler Chat room</div>
            {/* <div>
            <button className="logout-chatroom" onClick={handleLogOut}>Logout</button>
            </div> */}
          </div>
          {/* <ScrollToBottom> */}
          <div className="chatbox">
            
            <div className="chat-body">
              {chatBody.map((element, i) => {
                // console.log(element,element.messag, "elebody")
                if (element.type == "alert")
                  return (
                    <Alert
                      message={element.data}
                      key={i}
                      color={element.color}
                    />
                  );
                else
                  return (
                    <Message
                      message={element.data}
                      position={element.position}
                      key={i}
                      sender={element.sender}
                    />
                  );
              })}
              </div>
           
            <div className="form">
              <input
                className="textarea"
                id="input"
                name="input"
                cols={30}
                value={text}
                onChange={(ev)=>setText(ev.target.value)}
                
                onKeyUp={handleKeyUP}
              />

              <button className="btn" onClick={handleSendMessage}>
                &gt;
              </button>
            </div>
          </div>
          {/* </ScrollToBottom> */}
        </div>
      {/* </div> */}
    </>
  );
};

export default RoomPage;
