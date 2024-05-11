import { Container } from "react-bootstrap"
import { NavbarComp } from "../NavbarComp/NavbarComp"
// import { Dashboard } from "../Dashboard/Dashboard"
import { Outlet } from "react-router-dom"

export const Layout: React.FC<any> = () => {

    return (
        <>
            <NavbarComp />            
            <Container className="d-flex flex-column justify-content-center m-5 px-5">
                <Container className="w-75 p-3">
                    <Outlet />
                </Container>
            </Container>
        </>
    )
}