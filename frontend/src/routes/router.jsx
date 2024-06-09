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
import UpdateUserDetails from "../pages/Dashboard/UpdateUserDetails";
import AddHealthDetails from "../pages/Dashboard/user/AddHealthDetails";
import UpdateHealthdata from "../pages/Dashboard/user/UpdateHealthdata";
import Users from "../pages/Dashboard/admin/Users";
import AllDiets from "../pages/Dashboard/admin/AllDiets";
import AddDiet from "../pages/Dashboard/admin/AddDiet";
import AllWorkouts from "../pages/Dashboard/admin/AllWorkouts";
import AddWorkout from "../pages/Dashboard/admin/AddWorkout";
import AllInstructors from "../pages/Dashboard/admin/AllInstructors";
import AddInstructor from "../pages/Dashboard/admin/AddInstructor";
import UpdateD from "../pages/Dashboard/admin/UpdateD";
import UpdateW from "../pages/Dashboard/admin/UpdateW";
import UpdateI from "../pages/Dashboard/admin/UpdateI";
import UpdatePassword from "../pages/Dashboard/UpdatePassword";
import ViewAllFeedback from "../pages/Dashboard/admin/ViewAllFeedback";
import AdminP from "../pages/Dashboard/admin/AdminP";

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
        },
        {
          path:"updateUserDetails",
          element:<UpdateUserDetails/>
        },
        {
          path:"addHealthDetails",
          element:<AddHealthDetails/>
        },
        {
          path:"updateHealthdetails",
          element:<UpdateHealthdata/>
        },
        {
          path:"adminHome",
          element:<AdminP/>
        },
        {
          path:"manageUser",
          element:<Users/>
        },
        {
          path:"manageDiets",
          element:<AllDiets/>
        },
        {
          path:"addDiet",
          element:<AddDiet/>
        },
        {
          path:"manageWorkouts",
          element:<AllWorkouts/>
        },
        {
          path:"addWorkout",
          element:<AddWorkout/>
        },
        {
          path:"manageInstructors",
          element:<AllInstructors/>
        },
        {
          path:"addInstructor",
          element:<AddInstructor/>
        },
        {
          path:"updateD/:dietId",
          element:<UpdateD/>
        },
        {
          path:"updateW/:workoutId",
          element:<UpdateW/>
        },
        {
          path:"updateI/:instructorId",
          element:<UpdateI/>
        },
        {
          path:"updatePassword",
          element:<UpdatePassword/>
        },
        {
          path:"allFeedback",
          element:<ViewAllFeedback/>
        }
      ]
    }
  ]);
