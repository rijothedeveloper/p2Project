import { Button, Container, Nav, Navbar } from "react-bootstrap"
import { DeleteMyAccount } from "../Users/DeleteMyAccount";
import { useEffect } from "react";

export const NavbarComp: React.FC = () => {

    const upateNavbar = () => {
        const currentURL = new URL(window.location.href);
        const path = currentURL.pathname;
        const navbarItems = document.querySelectorAll(".nav-link");
        navbarItems.forEach((item) => {
            //item.classList.remove("active");
            if (item.getAttribute("href") == path) {
                item.classList.add("active");
            }
        });
    };

    useEffect(() => {
        upateNavbar();
    }, []);

    const logout = () => {
        // TODO: implement logout function
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>Social Reviews</Navbar.Brand>
                <Navbar.Toggle aria-controls="social-review-navbar-nav" />
                <Navbar.Collapse id="social-review-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link href="">Collections</Nav.Link>
                        <Nav.Link href="/allusers">Users</Nav.Link>
                    </Nav>
                    <Button type="button" variant="danger" onClick={logout}>Logout</Button>
                    <DeleteMyAccount />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}