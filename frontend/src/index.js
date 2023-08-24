import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <GoogleOAuthProvider clientId="313867018675-7m2p4hoiad717l2qpqao2lmplsqhr103.apps.googleusercontent.com">
    


    <App />
    </GoogleOAuthProvider>
    </Router>
);


