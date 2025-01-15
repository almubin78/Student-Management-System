import { createBrowserRouter } from "react-router-dom";
import RootPage from "../components/Home/RootPage";
import HomePage from "../components/Home/HomePage";
import ErrorElement from "../components/ErrorElement";
import Routine from "../components/Routine/Routine";
import Contact from "../components/Home/OutlatePages/Contact";
import StudentsHome from "../components/Students/StudentsHome";
import AdminHome from "../components/Admin/AdminHome";
import AttendanceHome from "../components/Admin/Attendence/AttendanceHome";
import Messages from "../components/Admin/Messages/Messages";
import SalaryStatus from "../components/Admin/SalaryStutus/SalaryStatus";
import Records from "../components/Admin/Records/Records";
import LoginPage from "../components/Home/OutlatePages/Login/LoginPage";

const router = createBrowserRouter([
    {
        path:'/',
        element:<RootPage/>,
        children:[
            {
                path:'/',
                element:<HomePage/>
            },
            // {
            //     path:'/routine',
            //     element:<Routine/>
            // },
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
        element:<StudentsHome/>
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

export default router;