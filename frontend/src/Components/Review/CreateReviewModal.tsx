import React, { useContext, useState } from "react";
import { ReviewInterface } from "../../Interfaces/ReviewInterface";
import axios, { AxiosError, AxiosResponse } from "axios";
import { UserContext } from "../../Contexts/UserContext";
import { UserInterface } from "../../Interfaces/UserInterface";
import { Button, FloatingLabel, Form, InputGroup, Modal } from "react-bootstrap";
import StarRating from "./StarRating";
import StarRatingForReview from "./StarRatingForReview";
import { apiURL, buildAuthHeader } from "../../FrontendAPI/api"
import { useToast } from "../../Contexts/ToastContext";



interface ReviewModalProps {
    isOpen: boolean
    onClose: (review:ReviewInterface) => void
    itemIdToPass: number
    children?: React.ReactNode
}

export const CreateReviewModal: React.FC<ReviewModalProps> = ({isOpen, onClose, children, itemIdToPass}) => {
    const [review, setReview] = useState<ReviewInterface>({
        title: "",
        body: "",
        itemId: itemIdToPass,
        rating: 0
    })

    const [isSubmitted, setIsSubmitted] = useState(false)
    const {currentUser} = useContext(UserContext)
    const jwt = currentUser ? currentUser.jwt : null

    const { addToast } = useToast();
    
    //if Modal button has not been pressed it will not show
    if(!isOpen) return null;

    //Method for submitting review 
    //TODO get itemId from button press or wherever it will be retrieved from
    const submitReview = async () => {
        
        console.log(review)
        console.log(itemIdToPass)

        const endpoint = "/reviews"
        const url = `${apiURL(endpoint)}`
        console.log(url)
        const authHeader = buildAuthHeader(jwt as string);
        const response = await axios.post(url, review, {headers: authHeader})    
        .then((response: AxiosResponse) => {
            addToast("Succussfully submitted review!", false, new Date());
            return response.data;
        })
        .catch((error: AxiosError) => {
            addToast("Failed to submit review!", true, new Date());
            console.log(`ERROR IN UPDATE ITEM: ${error}`)
        });

        // will hide modal body and show review submitted message to user
        setIsSubmitted(true)

        
    }

    //Stores values from text boxes
    const storeValues = (input: any) => {
        const {name,value} = input.target;
        setReview((prev) => ({...prev, [name]: value}))
    }
    //updates the review rating based on how many stars are clicked
    const updateReviewRating = (rating: number) => {
        // setReview((prev) => {
        //     const updated = {...prev, rating}
        //     return updated       
        setReview({...review, rating: rating})    
    }



   return (
        <Modal show={isOpen} onHide={() => onClose(review)}>
            <Modal.Header closeButton>
                <Modal.Title>Review</Modal.Title>
            </Modal.Header>

                        <Modal.Body hidden={isSubmitted}>
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
                            {/* <StarRatingForReview rating={review.rating as number} onRatingChange={updateReviewRating}></StarRatingForReview> */}
                            <StarRating 
                                review={{body: "", title: "", rating: 0}}
                                handleRatingChange={updateReviewRating}
                            ></StarRating>
                        </div>
                        </Modal.Body>
                        <div hidden={!isSubmitted} className="text-center">
                            <p>Your review is submitted</p>
                        </div>
                        <Modal.Footer>
                            <div className="d-flex flex-row ms-3">
                                <button className="btn btn-primary" onClick={submitReview}>Create</button>
                                <button className="btn btn-secondary ms-2" onClick={() => onClose(review)}>Close</button>
                            </div>
                        </Modal.Footer>
        </Modal>
   )
}