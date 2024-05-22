import { Container, ToastContainer } from "react-bootstrap"
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
            <div aria-live="polite" aria-atomic="true" className="position-relative">
                <ToastContainer position="bottom-end" className="p-3">

                </ToastContainer>
            </div>
        </>
    );
};