import * as React from "react"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import { deleteItem } from "../../FrontendAPI/api";
import { baseURL } from "../../FrontendAPI/api";
import { ItemInterface } from "../../Interfaces/ItemInterface"


/***** TODO REMOVE MOCK DATA AREA BELOW ****************************/
// interface ItemDTOInterface {
//     id: number,
//     name: string,
//     despcription?: string,
//     producerId?: number,
//     image: string,
//     rating: number
// }

// create mock user
const currentUser = {
    role: "admin",
    // role: "user",
    jwt: "token"
}

// const baseUrl = "localhost:3000"
/***** TODO REMOVE MOCK DATA AREA ABOVE ****************************



/*
    This component will display an item in a collection
    By clicking the "View Details" button the user can display the item details component
    If the user is an admin they can delete the item by clicking the "Delete" button
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


    // navigate to itemDetails if view details button is clicked
    const handleClickViewDetailsButton = (event: React.MouseEvent<HTMLButtonElement>) => {
        // TODO uncomment and test view items
        // navigate to itemDetails
        // navigate(`/${baseURL}/items/${id}`)
    }


    // delet item from collection if delete button is clicked
    const handleDeleteItemButtonClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        // delete item from database
        await deleteItem(currentUser.jwt, item.id as number)
        // call parent items function to update collection state
        handleDeleteItem(item.id as number)
    }


    // function to determine color of rating
    const ratingColor = () => {
      if(rating as number >= 4) return "text-success";
      if(rating as number >= 3) return "text-primary";
      if(rating as number >= 2) return "text-warning"
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