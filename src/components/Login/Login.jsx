import {React,useState} from 'react';
import "./login.css";
import logo from "../../images/logo.png";
import register from "../../images/register.png";
import { Link,useNavigate} from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import axios from "axios"

const Login = () => {
  
  const [email, setEmail]=useState()
  const [password, setPassword]=useState()
  const navigate=useNavigate()

  axios.defaults.withCredentials=true;
  const handleSubmit = (e)=>{
    e.preventDefault();
    axios.post('http://localhost:5000/login',{email,password})
    .then(result=>{console.log(result)
      if(result.data==="Success"){
        navigate('/welcome')
      }
      
  })
    .catch(err=> console.log(err));

  } 
  return (
    <div>

<div className='container'>
    {console.log('Login component rendering')}
      <div>
        <img src={logo} className='logo-img' alt="logo"/>
      </div>
      <div className='main-register'>
        <div className='form-section'>
            <h1 className='hello'>Welcome Arya</h1>
            <p className='create'>Login To Your Account</p>
            <form onSubmit={handleSubmit}>
                <div className='form-info'>
                    <input 
                      type='email' 
                      placeholder='Email-id' 
                      className='input'
                      autoComplete='off'
                      onChange={(e)=>setEmail(e.target.value)} 
                    />
                    <input 
                      type='password' 
                      placeholder='Password' 
                      className='input'
                      autoComplete='off'
                      onChange={(e)=>setPassword(e.target.value)} 

                    />
                   
                </div>

                <button className='signup-btn'>Login</button>
            </form>
            <p className='or'>OR</p>
            <div className='google-github-section'>
                <button className='google-github-btn'>Login With Google <FcGoogle className='google-github-icon'/></button>
                <button className='google-github-btn'>Login With Github<AiFillGithub className='google-github-icon'/></button>
            </div>

            <p className='login'>Don't have an Account?<Link to="/register" className='login-link'>SIGN UP</Link></p>
            
        </div>
        <hr/>
        <div>
            <div>
                <img src={register} alt="register"/>
            </div>
        </div>
      </div>
    </div>
      {/* <LoginRegister title='Welcome Arya' heading='Login To Your Account' btntext='Login' googlebtn='Login With Google' githubbtn='Login With Github' account="Don't have an Account?" loginsignup='SIGN UP' link={linkUrl} isSignIn={false}/> */}
    </div>
  )
}

export default Login
