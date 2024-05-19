import { Button, Container, Nav, Navbar } from "react-bootstrap"
import { DeleteMyAccount } from "../Users/DeleteMyAccount";
import { useContext, useEffect } from "react";
import { UserContext } from "../../Contexts/UserContext";

export const NavbarComp: React.FC = () => {

    const { currentUser } = useContext(UserContext);

    const upateNavbar = () => {
        const currentURL = new URL(window.location.href);
        const path = currentURL.pathname;
        const navbarItems = document.querySelectorAll(".nav-link");
        navbarItems.forEach((item) => {
            //item.classList.remove("active");
            if (item.getAttribute("href") === path) {
                item.classList.add("active");
            }
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            upateNavbar();
        }, 25);
        return () => clearTimeout(timer);
    }, []);

    const logout = () => {
        // TODO: implement logout function
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
                            <Nav.Link href="">Collections</Nav.Link>
                            <Nav.Link href="/allusers">Users</Nav.Link>
                        </Nav>
                        <Button type="button" variant="danger" onClick={logout}>Logout</Button>
                        <DeleteMyAccount />
                    </>}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}