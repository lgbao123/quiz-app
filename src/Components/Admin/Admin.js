import SideBar from "./SideBar"
import './Admin.scss'
import { FaBars } from 'react-icons/fa';
import { useState } from "react";
const Admin = () => {
    const [collapsed, setCollapsed] = useState(false)
    return (
        <div className="admin-container">
            <div className="sidebar">
                <SideBar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <FaBars className='far-bar' onClick={() => { setCollapsed(!collapsed) }} />
                sadas
            </div>
        </div>
    )
}
export default Admin