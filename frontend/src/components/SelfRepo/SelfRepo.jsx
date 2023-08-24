import React from 'react'
import logo from "../../images/logo.png"

const SelfRepo = ({repoNames}) => {
    
    if (!repoNames) {
        return <p>Loading...</p>; // or any other loading indicator
    }
  return (
    <div>
      
      
      <div>
       
        {repoNames.map(repoName => (
                    <li key={repoName}>{repoName}</li>
                ))}
        
      </div>
    </div>
  )
}

export default SelfRepo
