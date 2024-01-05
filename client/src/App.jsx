import { useState } from 'react'
import {Routes,Route} from 'react-router-dom';

import Lobby from './Screens/Lobby'
import  RoomPage  from './Screens/RoomPage';
import './App.css';
import Login from './components/Login';

function App() {
  

  return (
    <>
     <Routes>
     <Route path='/' element={<Login />  } />
      <Route path='/lobby' element={<Lobby/>  } />
      <Route path='/room/:roomId' element={<RoomPage/>}/>
     </Routes>
             
    </>
  )
}

export default App
