import { Container } from "react-bootstrap"
import { NavbarComp } from "../NavbarComp/NavbarComp"

export const Layout: React.FC<any> = ({children}) => {

    return (
        <>
            <NavbarComp />
            <Container className="d-flex flex-column justify-content-center m-5 px-5">
                <Container className="w-75 p-3">
                    {children}
                </Container>
            </Container>
        </>
    )
}