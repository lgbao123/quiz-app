
import './Admin.scss'
import { FaBars } from 'react-icons/fa';
import { useState } from "react";
import SideBar from './SideBar';
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
                sadas
            </div>
        </div>
    )
}
export default Admin