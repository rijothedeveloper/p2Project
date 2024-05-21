import * as React from "react"
import { UserContext } from "../../Contexts/UserContext"
import { Col, Container, Row } from "react-bootstrap"
import { ReviewInterface } from "../../Interfaces/ReviewInterface"
import Review from "./ItemReview"
import { Login } from "../Login/Login"



/*
    This componenet will display a list reviews
    If the role of user logged in is a user it will display the reviews of the user
    If the role of user logged in is an admin it will display all reviews
*/
const ReviewList: React.FC<{
    reviews : ReviewInterface[]
    handleEditReview: (review: ReviewInterface) => void
}> = ({reviews, handleEditReview }) => {

 
    // get current user from UserContext
    const { currentUser } = React.useContext(UserContext)
    // console.log(`CURRENT USER: ${JSON.stringify(currentUser)}`)

    console.log(`REVIEWS: ${JSON.stringify(reviews)}`)

    return currentUser
    ?  (
        <>
        <Container className="mt-4 r-flex">
            <Row md={2} className="g-2">
                {/* display reviews */}
                {reviews && reviews
                    // filter items based on nameFilter
                    .map(itemReview => {
                    return (
                        <Col>
                            <Review 
                                itemReview = { itemReview } 
                                handleEditReview = { handleEditReview }
                                key={itemReview.id}
                            />
                        </Col>
                )
                })}
            </Row>
        </Container> 
        </>
    )
    : <Login />
}

export default ReviewList
