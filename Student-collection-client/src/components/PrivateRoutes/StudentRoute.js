import { Navigate, Outlet } from "react-router-dom";

const StudentRoute = () => {
    const token = localStorage.getItem("authToken");
    const userRole = localStorage.getItem("userRole"); // Assuming role is stored

    return token && userRole === "student" ? <Outlet /> : <Navigate to="/" />;
};

export default StudentRoute;
