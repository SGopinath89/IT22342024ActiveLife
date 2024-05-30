import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import { Instructors } from "../pages/instructors/instructors";
import { Workouts } from "../pages/Workouts/Workouts";
import Diets from "../pages/Diets/Diets";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import UserP from "../pages/Dashboard/user/UserP";
import MyDiets from "../pages/Dashboard/user/MyDiets";
import MyWorkouts from "../pages/Dashboard/user/MyWorkouts";
import MyInstructors from "../pages/Dashboard/user/MyInstructors";

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
          path:"/diets",
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
    },

    {
      path:"/dashboard",
      element:<DashboardLayout/>,
      children:[
        {
          index:true,
          element:<Dashboard/>
        },
        {
          path:"userP",
          element:<UserP/>
        },
        {
          path:"my-Diets",
          element:< MyDiets/>

        },
        {
          path:"my-Workouts",
          element:<MyWorkouts/>
        },
        {
          path:"my-Instructors",
          element:<MyInstructors/>
        }
      ]
    }
  ]);
