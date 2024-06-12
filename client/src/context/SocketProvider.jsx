import React, { createContext, useContext, useMemo } from 'react'
import {io} from "socket.io-client"
const socketContext = createContext(null);

export const useSocket= ()=>{
    const socket = useContext(socketContext);
    return socket;
}
const SocketProvider = (props) => {
    
    
    const socket = useMemo(()=>io('/'),[] );
    // const socket = useMemo(()=>io('https://chat-app-backend-dh0t.onrender.com'),[] );
    // const socket = useMemo(()=>io('https://mern-chat-app-pied.vercel.app'),[] );



    
  return (
    <socketContext.Provider value={socket} >
        {props.children}
    </socketContext.Provider>
  )
}

export default SocketProvider
