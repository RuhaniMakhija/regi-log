import {React,useState,useEffect} from 'react'
import "./selfhosting.css"
import logo from "../../images/logo.png"
import SelfRepo from '../SelfRepo/SelfRepo';


const CLIENT_ID="41380882353b3c3a2910";
const Selfhosting = () => {
    const [accessToken, setAccessToken] = useState(null);
    const [rerender,setRerender]=useState(false);
    const [userData, setUserData]=useState([]);
    const [repoNames, setRepoNames] = useState([]);
    const [activeButton, setActiveButton] = useState(null);
    const [code, setCodeParam]=useState();
    const SelfClickhandler=(buttonname)=>{
        setActiveButton(buttonname);
      }

      useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParam = urlParams.get("code");
        setCodeParam(codeParam)
        
        console.log(codeParam);
    
        if (codeParam && localStorage.getItem("accessToken") === null) {
            async function getAccessToken() {
                try {
                    const response = await fetch("http://localhost:5000/getAccessToken?code=" + codeParam, {
                        method: "GET"
                    });
    
                    if (response.ok) {
                        const data = await response.json();
                        console.log(data);
                       
                        setUserData(data)
                        console.log(data)
                        if (data.access_token) {
                            localStorage.setItem("accessToken", data.access_token);
                            setAccessToken(data.access_token);
                            setRerender(!rerender);
                        }
                    } else {
                        console.error("Error fetching access token");
                    }
                } catch (error) {
                    console.error("Error:", error);
                }
            }
            getAccessToken();
        }
    },[accessToken]);

    async function getUserData(){
        await fetch("http://localhost:5000/getUserData",{
            method: "GET",
            headers: {
                "Authorization" :"Bearer " +localStorage.getItem("accessToken")
            }
        }).then((response)=>{
            return response.json();
        }).then((data)=>{
            console.log(data);
            setUserData(data)
            return fetch(data.repos_url, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("accessToken")
                }
            });
        })
        .then(response => {
            return response.json();
        })
        .then(repos => {
            console.log(repos); // Just for debugging, remove this line

            // Extract repository names
            const names = repos.map(repo => repo.name);
            setRepoNames(names); // Set the repository names in the state
        })
        .catch(error => {
            console.error("Error:", error);
        });
        
    }



      const loginWithGithub=()=>{
        window.location.assign("https://github.com/login/oauth/authorize?client_id="+CLIENT_ID);
      }
  return (
    <div>
      <div className='self-img-container'>
        <img src={logo}  className='self-logo' alt='logo'/>
      </div>
      

      {
        Object.keys(userData).length === 0  ? (
            <>
            <div className='self-div-info'>
        <h1 className='self-heading'>Welcome Arya Soni !</h1>
        <p className='self-para'>Choose from the following Deployment options</p>
      </div>
            <div className='self-btn-container'>
                <button className={`self-btn ${activeButton==="AWS Cloud"? "col-blue":""}`}
                onClick={()=>SelfClickhandler('AWS Cloud')}>
                    AWS Cloud
                </button>

                <button className={`self-btn ${activeButton==="Github"? "col-blue":""}`}
                onClick={loginWithGithub}>
                    Github
                </button>
            </div>
            </>
        ):
        (
<>

</>
        )
      }
      {window.location.href === "http://localhost:3001/self?code="+code && (
        <div className='container-get-repo'>
            <button onClick={getUserData} className='get-repo'>Repository List</button>
            </div>
          )}
      
      
      
      
        {repoNames.length !== 0 ? (
            <>
            <div className='self-div-info'>
            <h1 className='self-heading'> Welcome {userData.name}</h1>
            <p className='self-para'>Github Repository List</p>
            </div>
            <SelfRepo repoNames={repoNames} />
            </>
) : (
    <></>
)}
      {
        activeButton==="Github" && (
            <div className='organisation-input'>
                    <input type="text" className='input-or' placeholder="Github Repository" />
                    <button className='btn-or'>Submit</button>
                </div>
        )
    }
    </div>
    
  )
}

export default Selfhosting
