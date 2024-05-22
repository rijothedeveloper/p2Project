import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { deleteUserByID } from "../../FrontendAPI/api";
import { UserContext } from "../../Contexts/UserContext";
import { useToast } from "../../Contexts/ToastContext";

export const DeleteMyAccount: React.FC = () => {

    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const { addToast } = useToast();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseConfirm = async () => {
        const response = await deleteUserByID(currentUser?.jwt as string,currentUser?.id as number);
        if (!response.status) {
            console.error(response.message);
            addToast(response.message, true, new Date());
        } else {
            setShow(false);
            console.log(response.message);
            setCurrentUser(null);
            localStorage.removeItem('currentUser');
            navigate("/");
        }
    };

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