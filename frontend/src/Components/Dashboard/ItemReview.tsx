import * as React from "react"
import { Button, Card, Modal, Form }from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import { baseURL } from "../../FrontendAPI/api";
import { ReviewInterface } from "../../Interfaces/ReviewInterface";
import { ItemInterface } from "../../Interfaces/ItemInterface";


interface ItemReviewInterface extends ReviewInterface {
    item: ItemInterface
}



/***** TODO REMOVE MOCK DATA AREA BELOW ****************************/
// create mock user
// const currentUser = {
//     role: "admin",
//     // role: "user",
//     jwt: "token"
// }

// const baseUrl = "localhost:3000"
/***** TODO REMOVE MOCK DATA AREA ABOVE ****************************



/*
    This component will display a review
*/
const ItemReview: React.FC<{
    itemReview: ItemReviewInterface
}> = ({ itemReview }) => {
    
    const [showEditReviewModal, setShowEditReviewModal] = React.useState(false)
    const [updatedTitle, setUpdatedTitle] = React.useState(itemReview.title)
    const [updatedRating, setUpdatedRating] = React.useState(itemReview.rating)
    const [updatedBody, setUpdatedBody] = React.useState(itemReview.body)

    // get current user from UserContext
    const { currentUser } = React.useContext(UserContext)
    // console.log(`CURRENT USER: ${JSON.stringify(currentUser)}`)
    // const { jwt } = currentUser as  UserInterface
    const userRole = currentUser?.role == "USER" ? "user" : "admin"
    // const userRole = "admin"


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

    // function to handle change in title
    const handleReviewTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedTitle(e.target.value)
    }

    const validAmount = (amount: string) => {
        if(isNaN(Number(amount))) {
            alert(`Amount has to be a number!`)
            return false
        }
        if(amount == "") {
            alert('Please enter an amount')
            return false
        }

        const num = Number(amount)

        if(num > 5 || num < 1) {
            alert('Please enter a rating between 1 and 5')
            return false
        }
        return true
    }

    // function to handle change in rating
    const handleReviewRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const ratingEntered = e.target.value
        if(validAmount(ratingEntered)) setUpdatedRating(parseInt(ratingEntered, 10))
    }

    // function to handle change in name filter input
    const handleReviewBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedBody(e.target.value)
    }
    
    const handleSaveReveiwUpdate = () => {
        
        itemReview.title = updatedTitle;
        itemReview.rating = updatedRating as number;
        itemReview.body = updatedBody;
        // TODO save changes
        // TODO send changes to DB
        // update state ?

        setShowEditReviewModal(false)
    }


    return (
        <>
        <Card style={{ width: '14rem' }} className="m-1">
            <Card.Header>
                <div>
                    {itemReview.title}
                </div>
                <div>
                    {itemReview.item.name}
                </div>
                <div>
                    Rating: {itemReview.rating}
                </div>
            </Card.Header>
            <Card.Img variant="top" src={itemReview.item.image} className="mt-2"/>
            <Card.Body>
                {/* <Card.Title>{itemReview.title}</Card.Title> */}
                <Card.Text>
                    {itemReview.body}
                </Card.Text>
                <Button 
                    variant="primary"
                    
                    onClick={handleEditReviewButtonClick}
                >Edit Review</Button>
            </Card.Body>
        </Card>

        <Modal show={showEditReviewModal} onHide={handleEditReviewModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit review for {itemReview.item.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card style={{ width: '14rem' }} className="m-1">
                <Card.Header>
                </Card.Header>
                {/* <Card.Img variant="top" src={itemReview.item.image} className="mt-2"/> */}
                <Card.Body>
                    {/* <Card.Title>{itemReview.title}</Card.Title> */}
                    {/* <Card.Text>
                        {itemReview.body}
                    </Card.Text> */}

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
                    <Form.Control
                        type="text"
                        id="ratingUpdate"
                        value={updatedRating?.toString()}
                        onChange={handleReviewRatingChange}
                    ></Form.Control>

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
                        onClick={handleSaveReveiwUpdate}
                    >Save Changes</Button>
                    {/* <Button 
                        variant="danger"
                    >Delete Review</Button> */}
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