import * as React from "react"
import { Button, Card, Modal, Form, Container }from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import { baseURL } from "../../FrontendAPI/api";
import { ReviewInterface } from "../../Interfaces/ReviewInterface";
import { ItemInterface } from "../../Interfaces/ItemInterface";

import { apiURL, buildAuthHeader } from "../../FrontendAPI/api"
import axios, { AxiosError, AxiosResponse } from "axios";
import { UserInterface } from "../../Interfaces/UserInterface";
import StarRating from "../Review/StarRating";
import { DisplayStars } from "../Review/DisplayStars";

/*
    This component will display a review
*/
const ItemReview: React.FC<{
    itemReview: ReviewInterface
    handleEditReview: (review: ReviewInterface) => void
}> = ({ itemReview, handleEditReview }) => {
    
    const [showEditReviewModal, setShowEditReviewModal] = React.useState(false)
    const [updatedTitle, setUpdatedTitle] = React.useState(itemReview.title)
    const [updatedRating, setUpdatedRating] = React.useState(itemReview.rating)
    const [updatedBody, setUpdatedBody] = React.useState(itemReview.body)
    const [item, setItem] = React.useState({} as ItemInterface)

    // get current user from UserContext
    const { currentUser } = React.useContext(UserContext)
    // console.log(`CURRENT USER: ${JSON.stringify(currentUser)}`)
    const { jwt } = currentUser as  UserInterface
    const userRole = currentUser?.role == "USER" ? "user" : "admin"


    const handleEditReviewButtonClick = () => {
        setShowEditReviewModal(true)
    }

    const handleEditReviewModalClose = () => {
        // reset state to original values
        setUpdatedTitle(itemReview.title)
        setUpdatedRating(itemReview.rating)
        setUpdatedBody(itemReview.body)
        setShowEditReviewModal(false)
    }

    
    // function to validate string inputs
    const validStringInput = (input: string) => {
        return input.length > 0
    }   


    // function to handle change in title
    const handleReviewTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedTitle(e.target.value)
            
    }


    // function to handle change in rating
    const handleReviewRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const ratingEntered = e.target.value
        setUpdatedRating(parseInt(ratingEntered, 10))
    }


    // function to handle change in name filter input
    const handleReviewBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedBody(e.target.value)
    }
    
    // function to handle change in star rating
    const handleStarRatingChange = (rating: number) => {
        setUpdatedRating(rating)
    }   

    const handleSaveReviewUpdate = () => {
        if(validStringInput(updatedTitle as string)
             && validStringInput(updatedBody as string)
            && (updatedRating && updatedRating > 0)) {
            itemReview.title = updatedTitle;
            itemReview.rating = updatedRating as number;
            itemReview.body = updatedBody;
            // send changes to db
            console.log(`SENDING REVIEW TO UPDATE: ${JSON.stringify(itemReview)}`)
            handleEditReview(itemReview)
            // close modal
            setShowEditReviewModal(false)
        } else {
            alert("Please fill in all fields!")
        } 
    }
    
    React.useEffect(() => {
        // get item
        const getItem = async () => {
            const endpoint = "/items"
            const url = `${apiURL(endpoint)}/id/${itemReview.itemId}`
            const authHeader = buildAuthHeader(jwt as string);
            const response = await axios.get(url, {headers: authHeader})
            .then((response: AxiosResponse) => {
                // console.log(`RESPONSE FROM BACKEND: ${JSON.stringify(response.data)}`)
                // collectionInput = response.data
                setItem(response.data as ItemInterface)
            })
            .catch((error: AxiosError) => {
                console.log(`AXIOS ERROR IN GET COLLECTION: ${error}`)
            });
        }
        getItem()
    }, [])

    // console.log(`ITEM REVIEW PASSED FROM REVIEW LIST: ${JSON.stringify(itemReview)}`)   

    return (
        <>
        <Card className="h-100">
            <Card.Header>
                <div>
                    {item.name}
                </div>
                <div>
                    {/* Rating: {itemReview.rating} */}
                    <DisplayStars rating={itemReview.rating as number} />
                </div>
            </Card.Header>
            <Container className="ratio ratio-1x1">
                <Card.Img variant="top" src={item.image} alt={`Image of ${item.name}`} className="rounded-0"/>
            </Container>
            <Card.Body>
                <Card.Title>{itemReview.title}</Card.Title>
                <Card.Text>
                    {itemReview.body}
                </Card.Text>
                <Button 
                    variant="outline-primary"                   
                    onClick={handleEditReviewButtonClick}
                    hidden={userRole == "admin"}
                >Edit Review</Button>
            </Card.Body>
        </Card>

        {/* modal to edit reveiw */}
        <Modal size="sm" show={showEditReviewModal} onHide={handleEditReviewModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit review for {item.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card className="m-1">
                <Card.Header>
                </Card.Header>
                <Card.Body>
                    {/* Edit Title */}
                    <Form.Label htmlFor="titleUpdate">Title</Form.Label>
                    <Form.Control
                        type="text"
                        id="titleUpdate"
                        value={updatedTitle}
                        onChange={handleReviewTitleChange}
                    ></Form.Control>
                    {/* Edit Ratings */}
                    <Form.Label htmlFor="ratingUpdate">Rating</Form.Label>
                    <StarRating
                        review={itemReview}
                        handleRatingChange={handleStarRatingChange}
                        />
                    {/* <Form.Control */}
                        {/* type="number" */}
                        {/* id="ratingUpdate" */}
                        {/* min="1" */}
                        {/* max="5" */}
                        {/* value={updatedRating?.toString()} */}
                        {/* onChange={handleReviewRatingChange} */}
                    {/* ></Form.Control> */}
                    {/* Edit Description */}
                    <Form.Label htmlFor="bodyUpdate">Title</Form.Label>
                    <Form.Control
                        type="text"
                        id="bodyUpdate"
                        value={updatedBody}
                        onChange={handleReviewBodyChange}
                    ></Form.Control>
                </Card.Body>
                <Card.Footer>
                    <Button 
                        variant="primary"
                        onClick={handleSaveReviewUpdate}
                    >Save Changes</Button>
                </Card.Footer>
            </Card>
        </Modal.Body>
        <Modal.Footer>  

            </Modal.Footer>
        </Modal>
    </>
    )
}

export default ItemReview