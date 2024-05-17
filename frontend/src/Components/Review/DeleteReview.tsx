import axios from "axios";
import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { deleteReviewByID } from "../../FrontendAPI/api";
import { UserContext } from "../../Contexts/UserContext";

export const DeleteReview: React.FC = (review:any) => {


    //We are given the review information from the parent component and we will need the review ID for the html call.
    //We also need to be passed a function to call once the review is removes since we need to refresh the parent frame.
    //If called from the view all users frame then we need to go back to the all users frame but if from the item page then we need to go to the item page.  Not sure how best to implement.

    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext)

    const deleteReview = deleteReviewByID;


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseConfirm = () => {
        setShow(false)
        deleteReview(currentUser?.jwt as string,review.id)
    }


    return (
        <div>
            <button onClick={handleShow} className="btn btn-warning ms-1">Delete Review</button>
            
            <Modal show={show}>
                <Modal.Header>
                    <Modal.Title>Delete your review?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Deleting your review will delete all its replies. <br /><br />Click OK to delete review, Cancel to cancel.</Modal.Body>
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