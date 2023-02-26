import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { Link, NavLink, useNavigate } from 'react-router-dom'
import './Header.scss'
function Header() {
	const navigate = useNavigate();
	const handleLogin = () => {
		navigate("/login")
	}
	const handleRegister = () => {
		navigate("/register")
	}
	return (
		<div className='header-container'>
			<Navbar bg="light" expand="lg" className='fixed-top bg-transparent p-4'>
				<Container >

					<Link to='/' className='navbar-brand'>React-Bootstrap</Link>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav" className='navbar-list'>
						<Nav className="me-auto menu-item">
							<NavLink to='/' className='nav-link'>Home</NavLink>
							<NavLink to='/user' className='nav-link'>User</NavLink>
							<NavLink to='/admin' className='nav-link'>Admin</NavLink>
						</Nav>
						<Nav className="menu-item" >
							<button className='btn-login btn btn-outline-dark  '
								onClick={handleLogin}
							>Login</button>
							<button className='btn-signup btn btn-outline-dark'
								onClick={handleRegister}
							>Sign up</button>

							{/* <NavDropdown title="Settings" id="basic-nav-dropdown">
								<NavDropdown.Item href="#action/3.1">Log in</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.3">Log out</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.3">Profile</NavDropdown.Item>

							</NavDropdown> */}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>

	);
}

export default Header;