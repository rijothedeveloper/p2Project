import axios from "axios"
import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { deleteUserByID } from "../../FrontendAPI/api";
import { UserContext } from "../../Contexts/UserContext";



export const DeleteMyAccount: React.FC = () => {

    //This component created by Martin Manger

    //Firstly we will need to get the current users account details.  More specifically their ID.  
    //Then we will verify that they actually want to delete their account, prompt the user for a confirmation.
    //Then we initiate both the deletion of a user (html delete call) and forcefully end their session and redirect them to the main page.

    //This button will exist in the navbar since we want all users to be able to delete their own account at any point.  Hopefully the backend will handle the deletion of all replies and reviews but if not then we can handle it here if an endpoint is set up for it.

    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext)

    




    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseConfirm = () => {
        setShow(false)
        deleteUserByID(currentUser?.jwt as string,currentUser?.id as number)
        .then() //Delete user session, call whatever logout does
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