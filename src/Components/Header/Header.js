import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import './Header.scss'
function Header() {
	const navigate = useNavigate();
	const isAuthenticated = useSelector(state => state.user.isAuthenticated);
	const account = useSelector(state => state.user.account);

	const handleLogin = () => {
		navigate("/login")
	}
	const handleRegister = () => {
		navigate("/register")
	}
	return (
		<div className='header-container'>
			<Navbar bg="light" expand="md" className='fixed-top bg-lg-transparent p-4'>
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
								<NavDropdown title={account.username} id="basic-nav-dropdown" className='me-md-5 drop-down-section' drop='down-centered' key="'down-centered'">
									<NavDropdown.Item href="#action/3.3">Log out</NavDropdown.Item>
									<NavDropdown.Item href="#action/3.3">Profile</NavDropdown.Item>
								</NavDropdown>}



						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>

	);
}

export default Header;