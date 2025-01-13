import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const AppNavbar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">
                    <i className="bi bi-mortarboard-fill me-2"></i>
                    Course Management System
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/" className={isActive('/')}>
                            <i className="bi bi-house-door me-1"></i> Dashboard
                        </Nav.Link>
                        <Nav.Link as={Link} to="/classrooms" className={isActive('/classrooms')}>
                            <i className="bi bi-calendar3 me-1"></i> Classrooms
                        </Nav.Link>
                        <Nav.Link as={Link} to="/courses" className={isActive('/courses')}>
                            <i className="bi bi-book me-1"></i> Courses
                        </Nav.Link>
                        <Nav.Link as={Link} to="/enrollments" className={isActive('/enrollments')}>
                            <i className="bi bi-person-badge me-1"></i> Enrollments
                        </Nav.Link>
                        <Nav.Link as={Link} to="/instructors" className={isActive('/instructors')}>
                            <i className="bi bi-person-badge me-1"></i> Instructors
                        </Nav.Link>
                        <Nav.Link as={Link} to="/students" className={isActive('/students')}>
                            <i className="bi bi-people me-1"></i> Students
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>

            <style>{`
                .navbar {
                    box-shadow: 0 2px 4px rgba(0,0,0,.1);
                }
                .nav-link {
                    position: relative;
                    transition: color 0.3s ease;
                }
                .nav-link.active {
                    color: #fff !important;
                    font-weight: 500;
                }
                .nav-link.active::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background-color: #fff;
                }
                .nav-link:hover {
                    color: rgba(255,255,255,0.9) !important;
                }
                .navbar-brand {
                    font-weight: 600;
                    letter-spacing: 0.5px;
                }
            `}</style>
        </Navbar>
    );
};

export default AppNavbar;
