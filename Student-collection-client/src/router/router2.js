import { createBrowserRouter } from "react-router-dom";
import RootPage from "../components/Home/RootPage";
import HomePage from "../components/Home/HomePage";
import ErrorElement from "../components/ErrorElement";
//admin dashboard

import AttendanceHome from "../components/Admin/Attendence/AttendanceHome";
import AdminHome from "../components/Admin/AdminHome";
import Messages from "../components/Admin/Messages/Messages";
import SalaryStatus from "../components/Admin/SalaryStutus/SalaryStatus";
import Records from "../components/Admin/Records/Records";
//student dashboard
import StudentsHome from "../components/StudentsDashboard/StudentsHome";
import StudentProfile from "../components/StudentsDashboard/Profile/StudentProfile";
import Exercise from "../components/StudentsDashboard/Exercise/Exercise";
import Settings from "../components/StudentsDashboard/Settings/Settings";
//other pages
import Contact from "../components/Home/OutlatePages/Contact";
import LoginPage from "../components/Home/OutlatePages/Login/LoginPage";
import Register from "../components/Home/OutlatePages/Register/Register";


const router2 = createBrowserRouter([
    {
        path:'/',
        element:<RootPage/>,
        children:[
            {
                path:'/',
                element:<HomePage/>
            },
            {
                path:'/register',
                element:<Register/>
            },

            {
                path:'/login',
                element:<LoginPage/>
            },
            
            
            {
                path:'/contact',
                element:<Contact/>
            },
        ]
    },
    {
        path:'/student',
        element:<StudentsHome/>,
        children:[
            {
                path:'/student/profile',
                element:<StudentProfile/>
            },
            {
                path:'/student/exercise',
                element:<Exercise/>
            },
            {
                path:'/student/settings',
                element:<Settings/>
            },
            
        ]
    },
    {
        path:'/admin',
        element:<AdminHome/>,
        children:[
            {
                path:'/admin/attend',
                element:<AttendanceHome/>
            },
            {
                path:'/admin/message',
                element:<Messages/>
            },
            {
                path:'/admin/salaryStatus',
                element:<SalaryStatus/>
            },
            {
                path:'/admin/records',
                element:<Records/>
            },
        ]
    },
    {
        path:'*',
        element:<ErrorElement/>
    }
])

export default router2;