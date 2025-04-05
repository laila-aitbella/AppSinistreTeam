import { TbLockPassword } from "react-icons/tb";
import { FaRegUserCircle } from "react-icons/fa";
import Button from "../Componnents/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios"
const SignUp= () =>{
  const [cin,setCIN]= useState("")
  const [password,setPassword]= useState("")
  const [error,setError]=useState(null)
  const navigate = useNavigate();

  const handleSubmit=async (e) => { 
    e.preventDefault();
    try {
const response = await axios.post("http://localhost:3000/api/auth/login", { cin, password }
)



if (response.data.success) {

  const role = response.data.user.role;

  if (role === "admin") {
    navigate("/AdminDashboard");
  } else {
    navigate("/UserDashboard");
  }
}

}catch(error) {
  if(error.response && !error.response.data.success) {
setError(error.response.data.error)
  }
  else {
    setError("serveer Error")
  }
    }
    

  }
    return (
      <div className="login-container">
        <h2 className="form-title">Login in with</h2>
      {error && <p className="text-red-500">{error}</p>}
    
      <form action="#" className="login-form" onSubmit={handleSubmit}>
        <div className="input-wrapper">
        <input type="text" placeholder="Numéro d'Identité Nationale"
        onChange={(e)=>setCIN(e.target.value)}
        className="input-field" required
         />
  <i >
<FaRegUserCircle fontSize={24}/></i>
        </div>
        
        <div className="input-wrapper">
        <input type="password" placeholder="Mot de passe"
                onChange={(e)=>setPassword(e.target.value)}

        className="input-field" required
         />
      <i> <TbLockPassword fontSize={24}/>
      </i>
        </div>
  <a href="#" className="forgot-pass-link">Forgot Password?</a>
  <Button text="Log In"/>
      </form>
      <p className="signup-text"> Don't have an account? <a href="#">Signnup Now</a></p>
      </div>
    )
  }
  
  export default SignUp
  