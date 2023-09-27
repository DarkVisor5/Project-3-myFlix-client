import { Navbar, Nav } from "react-bootstrap";
import { NavLink, useMatch, useLocation  } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
    const match = useMatch("/");
    const location = useLocation();
    const isOnLoginPage = location.pathname === '/login' || location.pathname === '/signup';

    if (isOnLoginPage) {
        return null;
    }

    return (
        <Navbar bg="light" expand="lg" style={{ width: '100%', backgroundColor: '#87cefa' }}>
            <Navbar.Brand as={NavLink} to="/">
                myFlix
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavLink 
                        to="/" 
                        className={`nav-link ${match ? 'font-weight-bold' : ''}`}
                    >
                        Home
                    </NavLink>

                    {user && (
                        <NavLink to="/profile" className="nav-link">Profile</NavLink>
                    )}
                </Nav>
                {user ? (
                    <Nav className="ml-auto">
                        <Nav.Link onClick={() => {
                            onLoggedOut();
                        }}>Logout</Nav.Link>
                    </Nav>
                ) : (
                    <Nav className="ml-auto">
                        <NavLink to="/login" className="nav-link">Login</NavLink>
                        <NavLink to="/signup" className="nav-link">Sign Up</NavLink>
                    </Nav>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
}


