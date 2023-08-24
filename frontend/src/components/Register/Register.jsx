import React, { useState } from 'react';
import "./register.css";
import { Link, useNavigate} from 'react-router-dom';
import register from "../../images/register.png";
import logo from "../../images/logo.png";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import axios from "axios"


const Register = () => {
  const [firstname, setFirstname]=useState()
  const [lastname, setLastname]=useState()
  const [email, setEmail]=useState()
  const [password, setPassword]=useState()
  const [confirmPassword, setConfirmpassword]=useState()
  const navigate=useNavigate()

  const handleSubmit = (e)=>{
    e.preventDefault();
    axios.post('http://localhost:5000/register',{firstname,lastname,email,password,confirmPassword})
    .then(result=>{console.log(result)
      navigate('/login')
  })
    .catch(err=> console.log(err));

  } 

  return (
    <div className='container'>
    {console.log('Login component rendering')}
      <div>
        <img src={logo} className='logo-img' alt="logo"/>
      </div>
      <div className='main-register'>
        <div className='form-section'>
            <h1 className='hello'>Hello!</h1>
            <p className='create'>Create Your Account</p>
            <form onSubmit={handleSubmit}>
                <div className='form-info'>
                     <input 
                      type='text'
                      placeholder='First Name' 
                      className='input'
                      autoComplete='off'
                      onChange={(e)=>setFirstname(e.target.value)} 
                    />
                     <input 
                      type='text' 
                      placeholder='Last Name' 
                      className='input'
                      autoComplete='off'
                      onChange={(e)=>setLastname(e.target.value)} 
                    />
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
                    <input 
                      type='password' 
                      placeholder='Confirm Password' 
                      className='input'
                      autoComplete='off'
                      onChange={(e)=>setConfirmpassword(e.target.value)} 
                    />
                </div>

                <button className='signup-btn'>SIGN UP</button>
            </form>
            <p className='or'>OR</p>
            <div className='google-github-section'>
                <button className='google-github-btn'>Sign Up With Google <FcGoogle className='google-github-icon'/></button>
                <button className='google-github-btn'>Sign Up With Github<AiFillGithub className='google-github-icon'/></button>
            </div>

            <p className='login'>Already have an Account?<Link to="/login" className='login-link'>LOGIN</Link></p>
            
        </div>
        <hr/>
        <div>
            <div>
                <img src={register} alt="register"/>
            </div>
        </div>
      </div>
    </div>
  )








    // <LoginRegister title='Hello!' heading='Create Your Account' btntext='SIGN UP' googlebtn='Sign Up With Google' githubbtn='Sign Up With Github' account="Already have an Account?" loginsignup='LOGIN' link={linkUrl} isSignIn={true}/>
  
}

export default Register
