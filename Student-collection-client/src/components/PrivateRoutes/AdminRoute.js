import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
    const token = localStorage.getItem("authToken");
    const userRole = localStorage.getItem("userRole"); // Assuming role is stored

    return token && userRole === "admin" ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
