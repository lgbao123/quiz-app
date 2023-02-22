import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink } from 'react-router-dom'
import './Header.scss'
function Header() {
	return (
		<div className='header-container'>
			<Navbar bg="light" expand="lg">
				<Container >

					<Link to='/' className='navbar-brand'>React-Bootstrap</Link>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<NavLink to='/' className='nav-link'>Home</NavLink>
							<NavLink to='/user' className='nav-link'>User</NavLink>
							<NavLink to='/admin' className='nav-link'>Admin</NavLink>
						</Nav>
						<Nav >
							<button className='btn-login btn'>Login</button>
							<button className='btn-signup btn'>Sign up</button>
							<NavDropdown title="Settings" id="basic-nav-dropdown">
								<NavDropdown.Item href="#action/3.1">Log in</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.3">Log out</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.3">Profile</NavDropdown.Item>

							</NavDropdown>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>

	);
}

export default Header;