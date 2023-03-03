import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import './Header.scss'
import { postLogout } from '../../service/apiService';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';
import Profile from './Profile';
import { useState } from 'react';


function Header() {
	const [showModalProfile, setShowModalProfile] = useState(false);
	const navigate = useNavigate();
	const isAuthenticated = useSelector(state => state.user.isAuthenticated);
	const account = useSelector(state => state.user.account);
	const dispatch = useDispatch();
	const handleLogin = () => {
		navigate("/login")
	}
	const handleRegister = () => {
		navigate("/register")
	}
	const handleLogout = async () => {
		let res = await postLogout(account.email, account.refresh_token);
		if (res && res.EC === 0) {
			dispatch(doLogout());
			navigate("/")
		} else {
			toast.error(res.EM);
		}
	}
	return (
		<>
			<div className='header-container'>
				<Navbar bg="light" expand="md" className='fixed-top  p-4'>
					<Container >

						<Link to='/' className='navbar-brand text-uppercase'>quizzes</Link>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav" className='navbar-list'>
							<Nav className="me-auto menu-item">
								<NavLink to='/' className='nav-link'>Home</NavLink>
								<NavLink to='/user' className='nav-link'>User</NavLink>
								<NavLink to='/admin' className='nav-link'>Admin</NavLink>
							</Nav>
							<Nav className="menu-item" >
								{isAuthenticated === false ?
									<><button className='btn-login btn btn-outline-dark  '
										onClick={handleLogin}
									>Login</button>
										<button className='btn-signup btn btn-outline-dark'
											onClick={handleRegister}
										>Sign up</button>
									</> :
									<NavDropdown title={account.username} id="basic-nav-dropdown" className='drop-down-section me-md-5 pe-xxl-4' drop='down-centered' key="'down-centered'">
										<NavDropdown.Item onClick={() => setShowModalProfile(true)} >Profile</NavDropdown.Item>
										<NavDropdown.Item onClick={handleLogout}>Log out</NavDropdown.Item>
									</NavDropdown>}

							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</div>

			<Profile
				show={showModalProfile}
				setShow={setShowModalProfile}
			/></>
	);
}

export default Header;