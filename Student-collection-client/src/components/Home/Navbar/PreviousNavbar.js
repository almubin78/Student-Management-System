import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon, CrossIcon, OpenIcon } from '../../icons/icon';
import Marquee from 'react-fast-marquee';
// import { mainUrl } from '../../../hooks/useAxios';

const NavbarBefore = () => {
    const [isOpen, setIsOpen] = useState(false);

    // console.log(mainUrl)
    const [admin, setAdmin] = useState(true);
    const [student, setStudent] = useState(false)
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-blue-600 text-white shadow-md opacity-90">
            <div className="container mx-auto md:flex justify-between items-center px-4 py-3 md:py-4">

                {/* Icon and Logo */}
                <div className="flex items-center space-x-2">
                    <BookOpenIcon className="w-6 h-6 text-white" /> 
                    {/* <OpenBookIcon className="w-12 h-12 text-black cursor-pointer hover:text-green-500" />  */}
                    Icon size & color
                    <Link to="/" className="text-2xl font-bold">
                        Science and Technology
                    </Link>
                    <p>Switch to- {
                        admin ?
                            <button onClick={() => setAdmin(!admin)} className='btn cursor-pointer border rounded bg-orange-400 px-2 py-1 text-yellow-200'>Student</button> :
                            <><button onClick={() => setAdmin(!admin)} className='btn cursor-pointer border rounded bg-orange-400 px-2 py-1'> Admin</button>
                            </>
                    }</p>
                </div>

                {/* Mobile Menu Icon */}
                <div className="md:hidden mt-3" onClick={toggleMenu}>
                    {/* {isOpen ?
                        <CrossIcon className="w-6 h-6 bold text-red-600 cursor-pointer bg-slate-100 rounded" />
                        <h2 className='rounded:lg bg-black w-25 p-5 cursor-pointer'>X</h2>
                        <p className='d-flex text-yellow-300'>Close Menu <CrossIcon className="w-6 h-6 text-white cursor-pointer " /></p>
                        : <OpenIcon className="w-6 h-6 text-pink-800 rounded bg-slate-300 cursor-pointer" />} */}
                </div>

                {/* Links */}
                <div className={`flex-col md:flex md:flex-row md:items-center w-full md:w-auto ${isOpen ? 'flex' : 'hidden'} mt-4 md:mt-0`}>
                    <div className='flex items-center justify-start'>
                        {/* <HomeIcon1 className="w-6 h-6 text-white cursor-pointer" /> */}
                        <span></span>
                        <Link to="/" className="px-4 py-2 hover:bg-blue-500 rounded-md md:ml-4">
                            🏠Home
                        </Link>
                    </div>
                    <div className='flex items-center justify-start'>
                        {/* <MessageIcon className="w-6 h-6 text-white cursor-pointer" /> */}
                        {/* <Link to="/message" className="px-4 py-2 hover:bg-blue-500 rounded-md md:ml-4">
                            📝Text Me
                        </Link> */}
                        <Link to="/login" className="px-4 py-2 hover:bg-blue-500 rounded-md md:ml-4">
                            Login Now
                        </Link>
                    </div>

                    {
                        admin ? <>
                            <div className='flex items-center justify-start'>
                                {/* <HomeIcon1 className="w-6 h-6 text-white cursor-pointer" /> */}

                                <Link to="/admin" className="px-4 py-2 hover:bg-blue-500 rounded-md md:ml-4">
                                    Admin Panel
                                </Link>

                            </div>

                            <div className='flex items-center justify-start'>
                                <Link to="/routine" className="px-4 py-2 hover:bg-blue-500 rounded-md md:ml-4">
                                    🏌🏻‍♀️ My Routine
                                </Link>
                            </div>
                            <div className='flex items-center justify-start'>
                                <Link to="/routine" className="px-4 py-2 hover:bg-blue-500 rounded-md md:ml-4">
                                    🏌🏻‍♀️ Messages
                                </Link>
                            </div>
                        </> :
                            <>
                                <div className='flex items-center justify-start'>
                                    {/* <HomeIcon1 className="w-6 h-6 text-white cursor-pointer" /> */}
                                    <Link to="/progress" className="px-4 py-2 hover:bg-blue-500 rounded-md md:ml-4">
                                        🏠Your Progress
                                    </Link>
                                </div>
                                <div className='flex items-center justify-start'>
                                    {/* <HomeIcon1 className="w-6 h-6 text-white cursor-pointer" /> */}
                                    <Link to="/profile" className="px-4 py-2 hover:bg-blue-500 rounded-md md:ml-4">
                                        🏠Profile
                                    </Link>
                                </div>
                            </>
                    }
                    {
                        student && <>
                            <div className='flex items-center justify-start'>
                                {/* <HomeIcon1 className="w-6 h-6 text-white cursor-pointer" /> */}
                                <Link to="/progress" className="px-4 py-2 hover:bg-blue-500 rounded-md md:ml-4">
                                    🏠Your Progress
                                </Link>
                            </div>

                        </>
                    }


                </div>

            </div>

            <Marquee>
                <h1>জানুয়ারীতে একটা পুর্ণাংগ ওয়েবসাইট পাওয়া যাবে। ইনশাআল্লাহ্‌ !!👉🏻😃👉🏻 যেখানে তোমরা MCQ প্রাকটিস করতে পারবে। 👉🏻😃👉🏻Pdf ফাইল ডাউনলোড করতে পারবে। 👉🏻😃👉🏻তোমার পড়াশুনার প্রগ্রেস নিজেরাই দেখতে পাবে।</h1>
            </Marquee>
        </nav>
    );
};

export default NavbarBefore;