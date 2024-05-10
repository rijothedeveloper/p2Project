import axios from "axios";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const DeleteReview: React.FC = (review:any) => {


    //We are given the review information from the parent component and we will need the review ID for the html call.
    //We also need to be passed a function to call once the review is removes since we need to refresh the parent frame.
    //If called from the view all users frame then we need to go back to the all users frame but if from the item page then we need to go to the item page.  Not sure how best to implement.

    const navigate = useNavigate();

    const deleteOwnReview = async () => {
        //This function will run the html call to delete an account passing in the current users information so the backend can handle the deletion.

        const response = axios.delete("HTMLADDRESSNEEDSFIXING", {withCredentials:true}) //We need to know what to pass where and if there is data in the request body that needs to be sent.
        .then((response) => {alert(response.data)})  //for now alert any message returned from the delete command
        .then(() => {navigate("/")})  //We need to know where to go from here and which list to refresh.  Do we go back to item or users list?




        .catch((error) => {alert(error.response.data)})  //If there is an error then display the error in an alert.  Likely to change.  
    }


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseConfirm = () => {
        setShow(false)
        deleteOwnReview()
    }


    return (
        <div>
            <button onClick={handleClose}></button>
            
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