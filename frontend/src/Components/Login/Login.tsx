import { useState } from "react"
import { UserInterface } from "../../Interfaces/UserInterface"
import { Container } from "react-bootstrap";

export const Login: React.FC = () => {

    const [user, setUser] = useState<UserInterface>(/* set default values for a user */);

    // TODO: On successful login, set the current user

    return (
        <Container className="d-flex flex-column justify-content-center m-5 px-5">
            <Container className="w-75 p-3">

            </Container>
        </Container>
    )
}