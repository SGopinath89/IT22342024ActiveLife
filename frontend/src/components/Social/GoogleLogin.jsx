import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth"
import { useContext } from "react";
import { AuthContext } from "../../utilities/providers/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//Video 3 time 2:45:00
const GoogleLogin = () => {

  const {googleLogin} = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogin= async ()=>{
    //console.log("google login")
    try{
      const userCredential=await googleLogin();
      const user = userCredential.user;
      console.log(user);
      if(user){
        const userImp={
          fullName:user?.displayName,
          gender:"Is not specified",
          email: user?.email,
          phoneNo: "Is not specified",
          age: "Is not specified",
          address: "Is not specified",
          userName: "Is not specified",
          password: "Is not specified",
          maritalStatus: "Is not specified",
          employmentStatus: "Is not specified"
        };

        if(user.email && user.displayName){
          return axios.post('http://localhost:5000/new-user',userImp).then(()=>{
              navigate('/');
              return "Registration Successful"
          }).catch((err)=>{
            console.log(err)
            throw new Error(err)
          })
        }
      }
    }catch(error){
      console.error(error.message)
    }
    /*
    googleLogin().then((userCredential)=>{
      const user = userCredential.user;
        
    }).catch((error)=>{
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    })*/
  }

  return (
    <div className="flex items-center justify-center my-3">
        <button onClick={handleLogin} className="flex items-center outline-none bg-white border border-gray-300 rounded-lg shadow-md 
        px-6 py-4 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none">
            <FcGoogle className="h-6 w-6 mr-2"/>
            <span>Continue With Google</span>
        </button>
    </div>
  )
}

export default GoogleLogin