import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent
} from 'react-pro-sidebar';
import {
    FaUser,
    FaAngleDoubleLeft,
    FaAngleDoubleRight,
    FaTachometerAlt,
    FaList

} from 'react-icons/fa';
import sidebarBg from '../../assets/bg2.jpg';
import './SideBar.scss'
const SideBar = ({
    collapsed,
    toggled,
    handleToggleSidebar,
    handleCollapsedChange
}) => {
    const navigate = useNavigate();
    return (
        <ProSidebar
            image={sidebarBg ? sidebarBg : false}
            collapsed={collapsed}
            toggled={toggled}
            onToggle={handleToggleSidebar}
            breakPoint="md"
        >
            {/* Header */}
            <SidebarHeader>
                <Menu iconShape="circle">
                    {collapsed ? (
                        <MenuItem
                            icon={<FaAngleDoubleRight />}
                            onClick={handleCollapsedChange}
                        ></MenuItem>
                    ) : (
                        <div className='d-flex justify-content-between'>
                            <div
                                style={{
                                    padding: '9px 9px 9px 16px',
                                    textTransform: 'uppercase',
                                    fontWeight: 'bold',
                                    fontSize: 15,
                                    letterSpacing: '1px'
                                }}
                            >

                                <span className='admin' onClick={() => navigate("/")}>ADMIN</span>
                            </div>
                            <MenuItem
                                suffix={<FaAngleDoubleLeft />}
                                onClick={handleCollapsedChange}
                            >

                            </MenuItem>


                        </div>

                    )}
                </Menu>
            </SidebarHeader>
            {/* Content */}
            <SidebarContent>
                <Menu iconShape="circle">
                    <MenuItem
                        icon={<FaTachometerAlt />}
                    >
                        Dashboard
                        <NavLink to="/admin" />
                    </MenuItem>
                    <SubMenu title={'Features'} icon={<FaList />}>
                        <MenuItem>
                            Manage Users
                            <NavLink to="/admin/manage-user" />
                        </MenuItem>
                        <MenuItem>
                            Manage Quizzes
                            <NavLink to="/admin/manage-quizzes" />
                        </MenuItem>
                        <MenuItem>
                            Manage Quetions
                            <NavLink to="/admin/manage-question" />
                        </MenuItem>

                    </SubMenu>
                </Menu>
            </SidebarContent>
            {/* Footer */}
            <SidebarFooter style={{ textAlign: 'center' }}>
                <div className="sidebar-btn-wrapper" style={{ padding: '16px' }}>
                    <Link
                        className="sidebar-btn"
                        style={{ cursor: 'pointer' }}
                        to="/profile"
                    >
                        <FaUser />
                        <span>My Account</span>
                    </Link>
                </div>
            </SidebarFooter>
        </ProSidebar>
    );
};

export default SideBar;
