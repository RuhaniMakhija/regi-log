import React from 'react';
import './loginregister.css';
import { Link } from 'react-router-dom';
import logo from "../../images/logo.png"
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import register from "../../images/register.png";
import PropTypes from 'prop-types';

const LoginRegister = ({title,heading,btntext,googlebtn,githubbtn,account,loginsignup,link,isSignIn}) => {
  return (
    <div className='container'>
    {console.log('Login component rendering')}
      <div>
        <img src={logo} className='logo-img' alt="logo"/>
      </div>
      <div className='main-register'>
        <div className='form-section'>
            <h1 className='hello'>{title}</h1>
            <p className='create'>{heading}</p>
            <form>
                <div className='form-info'>
                    {isSignIn && <input type='text' placeholder='First Name' className='input'/>}
                    {isSignIn && <input type='text' placeholder='Last Name' className='input'/>}
                    <input type='email' placeholder='Email-id' className='input'/>
                    <input type='password' placeholder='Password' className='input'/>
                    {isSignIn && <input type='password' placeholder='Confirm Password' className='input'/>}
                </div>

                <button className='signup-btn'>{btntext}</button>
            </form>
            <p className='or'>OR</p>
            <div className='google-github-section'>
                <button className='google-github-btn'>{googlebtn} <FcGoogle className='google-github-icon'/></button>
                <button className='google-github-btn'>{githubbtn} <AiFillGithub className='google-github-icon'/></button>
            </div>

            <p className='login'>{account} <Link to={link} className='login-link'>{loginsignup}</Link></p>
            
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
}
LoginRegister.propTypes={
    title: PropTypes.string.isRequired,
    heading:PropTypes.string.isRequired,
    btntext:PropTypes.string.isRequired,
    googlebtn:PropTypes.string.isRequired,
    githubbtn:PropTypes.string.isRequired,
    account:PropTypes.string.isRequired,
    loginsignup:PropTypes.string.isRequired
}

export default LoginRegister
