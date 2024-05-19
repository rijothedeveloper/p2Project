import React, { useContext, useState } from "react";
import { ReviewInterface } from "../../Interfaces/ReviewInterface";
import axios from "axios";
import { UserContext } from "../../Contexts/UserContext";
import { UserInterface } from "../../Interfaces/UserInterface";
import { Button, FloatingLabel, Form, InputGroup, Modal } from "react-bootstrap";
import StarRating from "./StarRating";


interface ReviewModalProps {
    isOpen: boolean
    onClose: () => void
    itemIdToPass: number
    children?: React.ReactNode
}

export const ReviewModal: React.FC<ReviewModalProps> = ({isOpen, onClose, children, itemIdToPass}) => {
    const [review, setReview] = useState<ReviewInterface>({
        title: "",
        body: "",
        itemId: itemIdToPass,
        rating: 0
    })
    const {currentUser} = useContext(UserContext)
    
    //if Modal button has not been pressed it will not show
    if(!isOpen) return null;

    //Method for submitting review 
    //TODO get itemId from button press or wherever it will be retrieved from
    const submitReview = async () => {
        
        console.log(review)
        console.log(itemIdToPass)
        await axios.post(`http://localhost:8080/reviews/${review.itemId}`, review, {
            headers: {
                "Authorization":"Bearer " + currentUser?.jwt
            },
        })
        .catch((error) => {
            alert(error.response.data)
        }
    )}
    //Stores values from text boxes
    const storeValues = (input: any) => {
        const {name,value} = input.target;
        setReview((prev) => ({...prev, [name]: value}))
    }
    //updates the review rating based on how many stars are clicked
    const updateReviewRating = (rating: number) => {
        setReview((prev) => {
            const updated = {...prev, rating}
            return updated           
    })}
    return (
        <Modal show={isOpen} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Review</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
            {/**
             * If you are the owner of this review we include the Delete Review component.  We need to pass it the review ID at least and possibly a function to refresh
             * the view of wherever we were when the review was deleted.  Without that information the view displaying the review will still show and might confuse users.
             * Alternatively we could close the review modal when the delete button is pressed (we will be opening up a new modal) and then simply refresh the content.
             */}
                        <div className="mb-3">
                            <FloatingLabel controlId="floatingTitle" label="Title">
                                <Form.Control type="text" placeholder="Title" name="title" onChange={storeValues}/>
                            </FloatingLabel>
                        </div>
                        <div className="mb-3">
                            <FloatingLabel controlId="floatingBody" label="Body">
                                <Form.Control type="text" placeholder="body" name="body" onChange={storeValues}/>
                            </FloatingLabel>
                        </div>
                        <div>
                            <StarRating rating={review.rating} onRatingChange={updateReviewRating}></StarRating>
                        </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <div className="d-flex flex-row ms-3">
                                <button className="btn btn-primary" onClick={submitReview}>Create</button>
                                <button className="btn btn-secondary ms-2" onClick={onClose}>Close</button>
                            </div>
                        </Modal.Footer>
        </Modal>
    )
}