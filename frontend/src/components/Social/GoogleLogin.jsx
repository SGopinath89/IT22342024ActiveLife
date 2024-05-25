import { FcGoogle } from "react-icons/fc";

const GoogleLogin = () => {
  return (
    <div className="flex items-center justify-center my-3">
        <button className="flex items-center outline-none bg-white border border-gray-300 rounded-lg shadow-md 
        px-6 py-4 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none">
            <FcGoogle className="h-6 w-6 mr-2"/>
            <span>Continue With Google</span>
        </button>
    </div>
  )
}

export default GoogleLogin