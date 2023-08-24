import React,{useEffect, useState} from 'react';
import "./welcome.css";
import logo from "../../images/logo.png"
import { Link,useNavigate } from 'react-router-dom';
import axios from "axios"

const Welcome = () => {
    const [activeButton, setActiveButton] = useState(null);

    const handleClick = (buttonName) => {
      console.log('Button clicked:', buttonName);
        setActiveButton(buttonName === activeButton ? buttonName : buttonName);
        axios.post('http://localhost:5000/saveOption', {
            selectedOption: buttonName // Sending the selected option
        })
        .then(result => {
            console.log(result);
            
        })
        .catch(error => {
            console.error("Error saving option:", error);
        });
    };
    const navigate=useNavigate()

    useEffect(()=>{
      axios.get('http://localhost:5000/welcome')
      .then(result=>{console.log(result)
        if(result.data !== "Success"){
          navigate('/login')
        }
      })
    })
  return (
    <div className='container-welcome'>
        
      <div className='div-img'>
        <img src={logo} className="logo" alt='logo'/>
      </div>
      <div className='heading'>
        <h1>Welcome Arya Soni !</h1>
        <p className='para'>Choice From The Following</p>
      </div>
      <div className='div-btn'>

        <Link to="/developer">
        <button className={`btn ${activeButton==='Developer' ? 'active': ''}`}
        onClick={() => handleClick('Developer')}>
        Developer
        </button>
        </Link>


        <button className={`btn ${activeButton==='Organisation' ? 'active': ''}`}
         onClick={() => handleClick('Organisation')}>
                Organisation</button>


        <button className={`btn ${activeButton==='Company' ? 'active': ''}`}
        onClick={() => handleClick('Company')}>
                Company</button>
      </div>
      {activeButton === 'Organisation' && (
                <div className='organisation-input'>
                    <input type="text" className='input-or' placeholder="Enter organisation" />
                    <button className='btn-or'>Submit</button>
                </div>
            )}
      {activeButton === 'Company' && (
                <div className='organisation-input'>
                    <input type="text" className='input-or' placeholder="Company Name" />
                    <button className='btn-or'>Submit</button>
                </div>
            )}
      
    </div>
  )
}

export default Welcome
