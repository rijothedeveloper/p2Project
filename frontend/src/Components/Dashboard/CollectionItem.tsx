import * as React from "react"
import { Button, Card, Modal }from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import { deleteItem } from "../../FrontendAPI/api";
import { baseURL } from "../../FrontendAPI/api";
import { ItemInterface } from "../../Interfaces/ItemInterface"
import { UserInterface } from "../../Interfaces/UserInterface";
import { Login } from "../Login/Login";
import { Link } from "react-router-dom";



/*
    This component will display an item in a collection
    By clicking the "View Details" button the user can display the item details component
    If the user is an admin they can delete the item by clicking the "Delete" button
*/
const CollectionItem: React.FC<{
    item: ItemInterface,
    handleDeleteItem: (itemId: number) => void
}> = ({ item, handleDeleteItem }) => {

    const [ showItemDetails, setShowItemDetails ] = React.useState(false)
    
    const navigate = useNavigate();

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

    
    return currentUser 
    ?  (
        <>
        <Card style={{ width: '14rem' }} className="m-1">
            <Card.Img variant="top" src={ image } className="mt-2"/>
            <Card.Body>
                <Card.Title>{ name }</Card.Title>
                <Card.Text>
                    Rating: 
                        <span id="rating" className={ratingColor()}>
                            {/* TODO find beter way for spacing  */}
                            {`  ${rating}`}
                        </span>

                </Card.Text>
                <Button 
                    variant="outline-primary"
                    size="sm"
                    className = "mr-6"
                    onClick={handleClickViewDetailsButton}
                >View Details</Button>
                 {/* <Button 
                    variant="outline-primary"
                    size="sm"
                    className = "mr-6"
                >View Details</Button> */}
                {`     `}
                <Button
                    variant="outline-danger"
                    size="sm"    
                    onClick = { handleDeleteItemButtonClick }
                    hidden = { userRole === "user" }
                >Delete</Button>
            </Card.Body>
        </Card>
        
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
         {/* <Button variant="primary" onClick={handleItemDetailsModalClose}>
           Save Changes
         </Button> */}

        <Button variant="secondary" onClick={handleItemDetailsModalClose}>
           Close
         </Button>
       </Modal.Footer>
     </Modal>
        </>
    )
    : <Login />
}

export default CollectionItem