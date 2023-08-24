import React from 'react'
import Register from './components/Register/Register'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import LoginRegister from './components/LoginRegister/LoginRegister';
import Welcome from './components/Welcome/Welcome';
import Developer from './components/Developer/Developer';
import Selfhosting from './components/Selfhosting/Selfhosting';
import SelfRepo from './components/SelfRepo/SelfRepo';


const App = () => {
  return (
    <Routes>
      
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/welcome' element={<Welcome/>}/>
        <Route path='/developer' element={<Developer/>}/>
        <Route path='/self' element={<Selfhosting/>}/>
        <Route path='/self-repo' element={<SelfRepo/>}/>




   
      </Routes>
    
  )
}

export default App
  