import { Container } from "react-bootstrap"
import { NavbarComp } from "../NavbarComp/NavbarComp"
import { Dashboard } from "../Dashboard/Dashboard"

export const Layout: React.FC<any> = ({children}) => {

    return (
        <>
            <NavbarComp />

            
            {/* <Container>
                {children}
            </Container> */}

            <Dashboard />
        </>
    )
}