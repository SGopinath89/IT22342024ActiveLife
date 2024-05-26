import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import { Instructors } from "../pages/instructors/instructors";
import { Workouts } from "../pages/Workouts/Workouts";
import Diets from "../pages/Diets/Diets";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      children:[
        {
            path:"/",
            element:<Home/>,
        },     
        {
          path:"instructors",
          element:<Instructors/>

        },
        {
          path:"workouts",
          element:<Workouts/>
        },
        {
          path:"diets",
          element:<Diets/>
        },
        {
          path:"/login",
          element: <Login/>
        },
        {
          path:"/register",
          element: <Register/>
        }
      ]
    }
    
  ]);
