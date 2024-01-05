import React, { useEffect } from 'react'
import {GoogleOutlined, FacebookOutlined} from '@ant-design/icons';
import "firebase/app";
import {auth} from "./firebase";
import firebase from 'firebase/compat/app';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const Login = () => {
  const navigate = useNavigate();
  const user = useAuth();

 
  const handleGoogleLogin = ()=>{
    auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    navigate('/lobby');
  }
  useEffect(()=>{
    if(user != null) navigate('/lobby');
  },[user])
  return (
    <div id='login-page'>
        <div id="login-card">
            <h2>Welcome to unichat</h2>
            <div className="login-button google"
            onClick={handleGoogleLogin}
            >
                <GoogleOutlined /> Sign in with Google
            </div>
            {/* <br /> <br />
            <div className="login-button facebook"
            onClick={()=>auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())}
            >
                <FacebookOutlined /> Sign in with Facebook
            </div> */}
        </div>
    </div>
  )
}

export default Login