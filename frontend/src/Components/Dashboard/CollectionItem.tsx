import * as React from "react"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
// TODO uncomment import and use proper ItemInterface
// import { ItemInterface } from "../../Interfaces/ItemInterface"


// TODO REMOVE AREA BELOW
/***************************  DEFINE ItemInterface BELOW  ****************************/
interface ItemInterface {
    id: number,
    image: string,
    name: string,
    rating: number
}
/***************************  DEFINE ItemInterface  ABOVE ****************************/




/*
    This component will display an item in a collection
    By clicking the "View Details" button the user can display the item details component
    TODO : add functionality like DELETE FROM COLLECTION ?
*/
const CollectionItem: React.FC<{
    item: ItemInterface,
    handleDeleteItem: (itemId: number) => void
}> = ({ item, handleDeleteItem }) => {
    
    const navigate = useNavigate();

    // TODO finalize item detials to show
    const { id, image, name,  rating } = item;

    // TODO: uncomment
    // get currentUser used to deteremine wether to display delete item button or not
    // const currentUser = React.useContext(UserContext)


    // TODO delete mock user
    /********************** CREATE MOCK USER ************************ */
    const currentUser = {
        role: "admin"
        // role: "user"
    }



    // TODO get baseUrl frmo userContext
    const baseUrl = "localhost:3000"






    const handleClickViewDetailsButton = (event: React.MouseEvent<HTMLButtonElement>) => {
        // navigate to itemDetails
        // TODO add path to navigate to
        navigate(`/${baseUrl}/items/${id}`)
    }


    const handleDeleteItemButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        // call endpoint to delete item
        // TODO finalize url
        const url = `${baseUrl}/items/${item.id}`
        // call parent items function to update collection state
        handleDeleteItem(item.id)
    }

    // function to determine color of rating
    const ratingColor = () => {
      if(rating >= 4) return "text-success";
      if(rating >= 3) return "text-primary";
      if(rating >= 2) return "text-warning"
      return "text-danger"
    }

    return (
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
                {`     `}
                <Button
                    variant="outline-danger"
                    size="sm"    
                    onClick = { handleDeleteItemButtonClick }
                    hidden = { currentUser.role == "user" }
                >Delete</Button>
            </Card.Body>
        </Card>
    )
}

export default CollectionItem