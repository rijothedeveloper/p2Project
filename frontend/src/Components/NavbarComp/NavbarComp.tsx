import { Button, Container, Nav, Navbar } from "react-bootstrap"

export const NavbarComp: React.FC = () => {

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
                        <Nav.Link>Dashboard</Nav.Link>
                        <Nav.Link>Collections</Nav.Link>
                        <Nav.Link>Users</Nav.Link>
                    </Nav>
                    <Button type="button" variant="danger" onClick={logout}>Logout</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}