import * as React from "react"
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import { ReviewInterface } from "../../Interfaces/ReviewInterface";


/***** TODO REMOVE MOCK DATA AREA BELOW ****************************/
// create mock user
// const currentUser = {
//     role: "admin",
//     // role: "user",
//     jwt: "token"
// }

/***** TODO REMOVE MOCK DATA AREA ABOVE ****************************



/*
    This component will display a review
*/
const Review: React.FC<{
    review: ReviewInterface
}> = ({ review }) => {
    
    // const navigate = useNavigate();


    // TODO: uncomment
    // get currentUser used to deteremine wether to display delete item button or not
    // const currentUser = React.useContext(UserContext)


    return (
        <Card style={{ width: '14rem' }} className="m-1">
            <Card.Img variant="top" src="" className="mt-2"/>
            <Card.Body>
                <Card.Title>{  }</Card.Title>
                <Card.Text>

                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Review