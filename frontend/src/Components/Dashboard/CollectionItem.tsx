import * as React from "react"
import { Button, Card, Modal, Row, Col, Form }from 'react-bootstrap';
import { Route, useNavigate } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import { deleteItem } from "../../FrontendAPI/api";
import { ItemInterface } from "../../Interfaces/ItemInterface"
import { UserInterface } from "../../Interfaces/UserInterface";
import { ReviewInterface } from "../../Interfaces/ReviewInterface";
import { Login } from "../Login/Login";
import ItemReview from "./ItemReview";
import { ReviewModal } from "../Review/ReviewModal";
import { CreateReviewModal } from "../Review/CreateReviewModal";


/*
    This component will display an item in a collection
    By clicking the "View Details" button the user can display the item details component
    If the user is an admin they can delete the item by clicking the "Delete" button
*/
const CollectionItem: React.FC<{
    item: ItemInterface,
    handleDeleteItem: (itemId: number) => void
    reviews: ReviewInterface[]
    handleEditReview: (review: ReviewInterface) => void
    handleUpdateItem: (item: ItemInterface) => void
}> = ({ item, handleDeleteItem, reviews, handleEditReview, handleUpdateItem}) => {

    const [ showItemDetails, setShowItemDetails ] = React.useState(false)
    const [ showReview, setShowReview ] = React.useState(false)
    const [ showAddReviewModal, setShowAddReviewModal ] = React.useState(false) 
    const [ showUpdateItemModal, setShowUpdateItemModal ] = React.useState(false)
    // state for updated item
    const [ updatedItemName, setUpdatedItemName ] = React.useState(item.name)
    const [ updatedItemCategory, setUpdatedItemCategory ] = React.useState(item.category)
    const [ updatedItemDescription, setUpdatedItemDescription ] = React.useState(item.description)
    // const [ updatedItemProducerId, setUpdatedItemProducerId ] = React.useState(item.producerId)


    const currentItemReview = reviews.filter(review => review.itemId === item.id)[0] as ReviewInterface
    
    // const navigate = useNavigate();

    // TODO finalize item detials to show
    const { id, image, name,  rating } = item;

    // TODO: uncomment
    // get currentUser used to deteremine wether to display delete item button or not
    const { currentUser } = React.useContext(UserContext)
    const { jwt } = currentUser as  UserInterface
    const userRole: string = currentUser?.role == "USER" ? "user" : "admin"


    // function to handle if delete button is clicked
    const handleDeleteItemButtonClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        // call parent items function to update collection state
        handleDeleteItem(item.id as number)
    }

    const handleClickViewDetailsButton = (event: React.MouseEvent<HTMLButtonElement>) => {
        // show item item details modal
        setShowItemDetails(true)
    }

    const handleItemDetailsModalClose = () => {
        // close item details modal
        setShowItemDetails(false)
    }



    // function to determine color of rating
    const ratingColor = () => {
      if(rating as number >= 4) return "text-success";
      if(rating as number >= 3) return "text-primary";
      if(rating as number >= 2) return "text-warning"
      return "text-danger"
    }

    // function to check if user already reviewed item
    const isItemReviewed = (itemId: number) => {    
        // console.log(`ITEM ID: ${itemId}`)
        return reviews.filter(review => review.itemId === itemId).length > 0
    }

    // UPDATE ITEM MODAL FUNCTIONALITY

    const handleUpdateItemButtonClick = () => {  
        console.log(`ITEM TO UPDATE: ${JSON.stringify(item)}    `)
        setShowUpdateItemModal(true)
    }

    const handleShowUpdateItemModalClose = () => {
        setShowUpdateItemModal(false)
    }

    const handleItemNameUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedItemName(event.target.value)
    }

    const handleItemCategoryUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {  
        setUpdatedItemCategory(event.target.value)
    }

    const handleItemDescriptionUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedItemDescription(event.target.value)
    }   


    // const handleItemProducerIdUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {    
    //     setUpdatedItemProducerId(parseInt(event.target.value, 10))
    // }

    const handleSaveItemUpdate = () => {
        console.log(`SENDING ITEM TO UPDATE: ${JSON.stringify(item)}`)
        handleUpdateItem({
            id: item.id,
            name: updatedItemName,
            category: updatedItemCategory,
            description: updatedItemDescription,
            // producerId: updatedItemProducerId
        
        })
        setShowUpdateItemModal(false)
    }


    // SHOW REVIEW MODAL FUNCTIONALITY
    
    const handleViewReviewButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {      
        // show review
        setShowReview(true)
    }

    const handleShowReviewModalClose = () => {
        setShowReview(false)
    }


    // ADD REVIEW MODAL FUNCTIONALITY

    const handleAddReviewButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        // console.log("ADD REVIEW BUTTON CLICKED")
        setShowAddReviewModal(true)
    }

    const handleAddReviewModalClose = () => {
        setShowAddReviewModal(false)
    }

    // console.log(JSON.stringify(reviews))
    // console.log(isItemReviewed(id as number))


    const handleAddReview = (review: ReviewInterface) => {
        // // console.log(`REVIEW TO ADD: ${JSON.stringify(review)}`)
        // // add review to reviews array
        // reviews.push(review)
        // // console.log(`REVIEWS AFTER ADD: ${JSON.stringify(reviews)}`)
        // // close review modal
        // setShowAddReviewModal(false)
        console.log(`REVIEW ADDED ${JSON.stringify(review)}`)
    }   



    
    return currentUser 
    ?  (
        <>

        {/* modal to show and edit  review */}
        <Modal show={showReview} onHide={handleShowReviewModalClose}>
            <Modal.Header closeButton>
            </Modal.Header>
            <ItemReview
                itemReview = { currentItemReview as ReviewInterface }
                handleEditReview={handleEditReview}
            />
        </Modal>

        {/* modal to edit item  */}
        <Modal show={showUpdateItemModal} onHide={handleShowUpdateItemModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card style={{ width: '14rem' }} className="m-1">
                <Card.Body>
                    {/* Edit Name */}
                    <Form.Label htmlFor="name">Name</Form.Label>
                    <Form.Control
                        type="text"
                        id="name"
                        value={updatedItemName}
                        onChange={handleItemNameUpdate}
                    ></Form.Control>
                    {/* Edit Category */}
                    <Form.Label htmlFor="category">Category</Form.Label>                    
                    <Form.Control
                        type="text"
                        id="name"
                        value={updatedItemCategory}
                        onChange={handleItemCategoryUpdate}
                    ></Form.Control>
                    {/* Edit Description */}
                    <Form.Label htmlFor="description">Description</Form.Label>
                    <Form.Control
                        type="text"
                        id="description"
                        value={updatedItemDescription}
                        onChange={handleItemDescriptionUpdate}
                    ></Form.Control>                    
                    {/* Edit Producer id
                    <Form.Label htmlFor="producerId">Producer Id</Form.Label>
                    <Form.Control
                        type="number"
                        id="producerId"
                        min="1"
                        value={updatedItemProducerId?.toString()}
                        onChange={handleItemProducerIdUpdate}
                    ></Form.Control> */}
                </Card.Body>
                <Card.Footer>
                    <Button 
                        variant="primary"
                        onClick={handleSaveItemUpdate}
                    >Save Changes</Button>
                </Card.Footer>
            </Card>
            </Modal.Body>
            <Modal.Footer>   
                
            </Modal.Footer>
        </Modal>       

        {/* card to show item */}
        <Card style={{ width: '14rem' }} className="m-1">
            <Card.Img variant="top" src={ image } alt={`Image of ${item.name}`} className="mt-2"/>
            <Card.Body>
                <Card.Title>{ name }</Card.Title>
                <Card.Text>
                    Rating: 
                        <span id="rating" className={ratingColor()}>
                            {/* TODO find beter way for spacing  */}
                            {`  ${rating}`}
                        </span>
                </Card.Text>
                <Row className="mb-2">
                <Button 
                    variant="outline-primary"
                    size="sm"
                    className = "mr-6"
                    onClick={handleClickViewDetailsButton}
                >View Details</Button>
                </Row>
                <Row>
                 <Button 
                    variant="outline-primary"
                    size="sm"
                    className = "mr-6"
                    hidden = { userRole === "admin" || !isItemReviewed(id as number)}
                    onClick={handleViewReviewButtonClick}
                >View My Review</Button>
                </Row>
                <Row>
                 <Button 
                    variant="outline-primary"
                    size="sm"
                    className = "mr-6"
                    hidden = { userRole === "admin" || isItemReviewed(id as number)}
                    onClick={handleAddReviewButtonClick}
                >Review Item</Button>
                </Row>
                <Row className="mb-2">
                <Button
                    variant="outline-success"
                    size="sm"    
                    onClick = { handleUpdateItemButtonClick }
                    hidden = { userRole === "user" }
                >Update Item</Button>
                </Row>   
                <Row    >             
                <Button
                    variant="outline-danger"
                    size="sm"    
                    onClick = { handleDeleteItemButtonClick }
                    hidden = { userRole === "user" }
                >Delete Item</Button>
                </Row>
            </Card.Body>
        </Card>   

        {/* modal to show item details */}
        <Modal show={showItemDetails} onHide={handleItemDetailsModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>{item.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Card style={{ width: '18rem' }} className="m-1">
                    <Card.Img variant="top" src={ image } className="mt-2"/>
                    <Card.Body>
                        <Card.Text>
                        </Card.Text>
                            <div>
                                Category: {item.category}
                            </div>
                            {/* <div>
                                Producer: {item.producerId}
                            </div> */}
                            <div>
                                Rating: 
                                    <span id="rating" className={ratingColor()}>
                                        {/* TODO find beter way for spacing  */}
                                        {`  ${rating}`}
                                    </span>
                            </div>
                            <div>
                                Description: {item.description}
                            </div>
                    </Card.Body>
                </Card>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="outline-danger"
                    size="sm"    
                    onClick = { handleDeleteItemButtonClick }
                    hidden = { userRole == "user" }
                >Delete</Button>
                <Button variant="secondary" onClick={handleItemDetailsModalClose}
                > Close</Button>
            </Modal.Footer>
        </Modal>

        {/* modal to add review */}
        <CreateReviewModal
            isOpen={showAddReviewModal}
            onClose={handleAddReviewModalClose}
            itemIdToPass={id as number} 
        />
        </>
    )
    : <Login />
}

export default CollectionItem