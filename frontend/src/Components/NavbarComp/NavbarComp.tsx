import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { DeleteMyAccount } from "../Users/DeleteMyAccount";
import { useContext, useEffect } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { useNavigate } from "react-router-dom";

export const NavbarComp: React.FC = () => {

    const { currentUser, setCurrentUser } = useContext(UserContext)
    const navigate = useNavigate();

    const upateNavbar = () => {
        const currentURL = new URL(window.location.href);
        const path = currentURL.pathname;
        const navbarItems = document.querySelectorAll(".nav-link");
        navbarItems.forEach(item => item.classList.remove("active"));
        navbarItems.forEach((item) => {
            if (item.getAttribute("href") === path) {
                item.classList.add("active");
            }
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            upateNavbar();
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
        navigate("/");
    };

    return (
        <Navbar fixed="top" expand="lg" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/">Social Reviews</Navbar.Brand>
                <Navbar.Toggle aria-controls="social-review-navbar-nav" />
                <Navbar.Collapse id="social-review-navbar-nav" className="justify-content-end">
                    {currentUser == null ?
                    <Nav>
                        <Nav.Link href="/">Login</Nav.Link>
                        <Nav.Link href="/register">Register</Nav.Link>
                    </Nav> :
                    <>
                        <Nav>
                            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                            <Nav.Link href="/items">All Items</Nav.Link>
                            {currentUser.role?.toUpperCase() == "ADMIN" && <NavDropdown title="ADMIN">
                                <NavDropdown.Item href="/allusers">Users</NavDropdown.Item>
                                <NavDropdown.Item href="/review-management">Review Management</NavDropdown.Item>
                            </NavDropdown>}
                        </Nav>
                        <Button type="button" variant="danger" onClick={logout}>Logout</Button>
                        <DeleteMyAccount />
                    </>}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}