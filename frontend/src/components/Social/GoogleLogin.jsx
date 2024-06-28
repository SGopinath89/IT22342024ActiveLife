import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { useContext } from "react";
import { AuthContext } from "../../utilities/providers/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const GoogleLogin = () => {
  const { googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential = await googleLogin();
      const user = userCredential.user;
      console.log(user);

      if (user) {
        const userImp = {
          fullName: user?.displayName,
          gender: "Is not specified",
          email: user?.email,
          phoneNo: "Is not specified",
          age: 0,
          address: "Is not specified",
          userName: "Is not specified",
          photoUrl: "Is not specified",
          role: "user",
          password: "xxx",
          employmentStatus: "Is not specified"
        };

        if (user.email && user.displayName) {
          // Check if the user already exists in the database
          const existingUserResponse = await axios.get(`http://localhost:5000/user/email/${user.email}`);
          const existingUser = existingUserResponse.data;

          if (existingUser) {
            // User exists, proceed with login
            navigate('/');
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Login Successful!!",
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            // User does not exist, create a new user document
            await axios.post('http://localhost:5000/user', userImp);
            navigate('/');
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Login & Register Successful!!",
              showConfirmButton: false,
              timer: 1500
            });
          }
        }
      }
    } catch (error) {
      console.error("Error during Google login:", error.message);
      if (error.response) {
        console.error("Server response:", error.response.data);
      }
      Swal.fire({
        title: 'Error!',
        text: 'There was an error with Google login.',
        icon: 'error',
      });
    }
  };

  return (
    <div className="flex items-center justify-center my-3">
      <button onClick={handleLogin} className="flex items-center outline-none bg-white border border-gray-300 rounded-lg shadow-md px-6 py-4 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none">
        <FcGoogle className="h-6 w-6 mr-2" />
        <span>Continue With Google</span>
      </button>
    </div>
  );
}

export default GoogleLogin;
