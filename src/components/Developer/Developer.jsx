import {React,useState} from 'react';
import logo from "../../images/logo.png"
import "./developer.css"
import {Link} from 'react-router-dom'

const Developer = () => {
  const [activeButton, setActiveButton] = useState(null);


  const Clickhandler=(buttonname)=>{
    setActiveButton(buttonname);
  }
  return (
    <div>
      <div className='developer-img-container'>
        <img src={logo} className='developer-logo' alt="logo"/>
      </div>
      <div className='div-developer'>
        <h1 className='developer-heading'>Welcome to Arya Soni</h1>
        <p className='developer-para'>Choose From The Following Developer Options</p>
      </div>
      <div className='div-btn'>

      <Link to="/self">
        <button className={`hosting ${activeButton==='Self Hosting'? "blue": ""}`}
        onClick={()=>Clickhandler('Self Hosting')}>
        Self Hosting
        </button>
      </Link>

        <button className={`hosting ${activeButton==='XeroCodee Hosting'?"blue" :""}`}
        onClick={()=>Clickhandler('XeroCodee Hosting')}>
        XeroCodee Hosting
        </button>

      </div>  
    </div>
  )
}

export default Developer
