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

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={ image } />
            <Card.Body>
                <Card.Title>{ name }</Card.Title>
                <Card.Text>
                    { rating }
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