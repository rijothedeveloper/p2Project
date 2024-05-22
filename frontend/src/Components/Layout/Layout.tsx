import { Container } from "react-bootstrap"
import { NavbarComp } from "../NavbarComp/NavbarComp"
import { Outlet } from "react-router-dom"

export const Layout: React.FC<any> = () => {

    return (
        <>
            <NavbarComp />
            <Container className="d-flex flex-column justify-content-center m-5 px-5 pt-2">
                <Container className="w-75 p-3">
                    <Outlet />
                </Container>
            </Container>
        </>
    );
};