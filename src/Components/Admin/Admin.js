
import './Admin.scss'
import { FaBars } from 'react-icons/fa';
import { useState } from "react";
import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Admin = () => {
    const [collapsed, setCollapsed] = useState(false)
    const [toggled, setToggled] = useState(false);
    const handleToggleSidebar = (value) => {
        setToggled(value);
    };
    const handleCollapsedChange = () => {
        setCollapsed(!collapsed);
    };
    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed}
                    toggled={toggled}
                    handleToggleSidebar={handleToggleSidebar}
                    handleCollapsedChange={handleCollapsedChange}
                />
            </div>
            <div className="admin-content">
                <FaBars className='far-bar btn-toggle' onClick={() => { handleToggleSidebar(true) }} />
                <Outlet />
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
        </div>
    )
}
export default Admin