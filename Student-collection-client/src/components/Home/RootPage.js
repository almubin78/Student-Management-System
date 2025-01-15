import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer/Footer';
import Navbar from './Navbar/Navbar';
// import useAxios from '../../hooks/useAxiosSecure';

const RootPage = () => {
    return (
        <div>
            <div className='sticky top-0'>
                <Navbar />
            </div>
            <Outlet />
            <Footer />
        </div>
    );
};

export default RootPage;