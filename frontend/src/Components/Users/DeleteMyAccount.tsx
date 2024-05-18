import axios from "axios"
import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { deleteUserByID } from "../../FrontendAPI/api";
import { UserContext } from "../../Contexts/UserContext";
import { UserInterface } from "../../Interfaces/UserInterface"



export const DeleteMyAccount: React.FC = () => {

    

    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext)
    const { setCurrentUser } = useContext(UserContext)

    const[emptyUser, setUser] = useState<UserInterface>({
        username:"",
        password:"",
        jwt:""
    })




    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseConfirm = () => {
        setShow(false)
        deleteUserByID(currentUser?.jwt as string,currentUser?.id as number)
        .then(() => {setCurrentUser(emptyUser)}) 
        .then(() => {navigate("/")})
    }



    return(
        <div>
            <button onClick={handleShow} className="btn btn-warning ms-1">Delete my account</button>

            <Modal show={show}>
                <Modal.Header>
                    <Modal.Title>Delete your account?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Deleting your account will delete all your reviews and replies, as well as replies to your reviews. <br /><br />Click OK to delete account, Cancel to cancel.</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseConfirm}>
                        OK
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )


}