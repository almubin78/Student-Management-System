import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminDashBoard from './Dashboard/AdminDashBoard';

const AdminHome = () => {
    return (
        <div>
            <AdminDashBoard/>
            <Outlet/>
        </div>
    );
};

export default AdminHome;