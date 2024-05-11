import * as React from "react"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
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
    item: ItemInterface
}> = ({ item }) => {


    // TODO finalize item detials to show
    const { id, image, name,  rating } = item;
    // mock details
    // const image = 

    const navigate = useNavigate();

    const handleClickViewDetailsButton = (event: React.MouseEvent<HTMLButtonElement>) => {
        // navigate to itemDetails
        // TODO add path to navigate to
        navigate("/${baseUrl}/items/${id}")
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
                    variant="primary"
                    onClick={handleClickViewDetailsButton}
                >View Details</Button>
            </Card.Body>
        </Card>
    )
}

export default CollectionItem