import * as React from "react"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
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
    


    // TODO: uncomment
    // get currentUser used to deteremine wether to display delete item button or not
    // const currentUser = React.useContext(UserContext)


    return (
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
            </Card.Body>
        </Card>
    )
}

export default ItemReview