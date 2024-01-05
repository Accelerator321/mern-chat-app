
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { auth } from '../components/firebase';

const authContext = createContext();

export const useAuth = ()=>{
    return useContext(authContext);
}
const AuthProvider = ({children}) => {
    const [ user,setUser] = useState(null);
    const [ loading,setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        auth.onAuthStateChanged((user)=> {
            setUser(user);
            setLoading(false);
            // console.log(user);

            if(user ==null) navigate('/');
            
        })
    },[user,navigate]);
  return (
    
    <authContext.Provider value={user}>
        {(!loading) &&children}
    </authContext.Provider>

  )
}

export default AuthProvider