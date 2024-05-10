import { Container } from "react-bootstrap"
import { NavbarComp } from "../NavbarComp/NavbarComp"

export const Layout: React.FC<any> = ({children}) => {

    return (
        <>
            <NavbarComp />
            <Container>
                {children}
            </Container>
        </>
    )
}