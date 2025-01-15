
import { Link } from 'react-router-dom';


const AdminDashBoard = () => {
  

    return (
        <nav className="bg-blue-600 text-white shadow-md opacity-90">
            <div className="container mx-auto md:flex justify-between items-center px-4 py-3 md:py-4">




                {/* Links */}
                <div className={`flex-col md:flex md:flex-row md:items-center w-full md:w-auto mt-4 md:mt-0`}>
                    <div className='flex items-center justify-start'>
                        {/* <HomeIcon1 className="w-6 h-6 text-white cursor-pointer" /> */}
                        <span></span>
                        <Link to="/admin/attend" className="px-4 py-2 hover:bg-blue-500 rounded-md md:ml-4">
                            Attendance
                        </Link>
                    </div>

                    

                    <div className='flex items-center justify-start'>
                        {/* <MessageIcon className="w-6 h-6 text-white cursor-pointer" /> */}
                        <Link to="/admin/message" className="px-4 py-2 hover:bg-blue-500 rounded-md md:ml-4">
                            📝Message
                        </Link>
                    </div>

                    <div className='flex items-center justify-start'>
                        {/* <TiketIcon className="w-6 h-6 text-white cursor-pointer" /> */}
                        <Link to="/admin/records" className="px-4 py-2 hover:bg-blue-500 rounded-md md:ml-4">
                            records
                        </Link>
                    </div>
                   




                </div>

            </div>
            <div className='flex items-center justify-start'>
                {/* <TiketIcon className="w-6 h-6 text-white cursor-pointer" /> */}
                <Link to="/admin" className="px-4 py-2 hover:bg-blue-500 rounded-md md:ml-4">
                    Back to Dashboard
                </Link>
                <Link to="/" className="px-4 py-2 hover:bg-blue-500 rounded-md md:ml-4">
                    Back to Home
                </Link>
            </div>

        </nav>
    );
};

export default AdminDashBoard;