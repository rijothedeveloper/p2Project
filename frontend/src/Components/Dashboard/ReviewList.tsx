import * as React from "react"
import { UserContext } from "../../Contexts/UserContext"
import { Container, Row, Form } from "react-bootstrap"
import { UserContextInterface } from "../../Interfaces/UserContextInterface"
import { ReviewInterface } from "../../Interfaces/ReviewInterface"
import Review from "./ItemReview"
import { UserInterface } from "../../Interfaces/UserInterface"
import { Login } from "../Login/Login"
import { ItemInterface } from "../../Interfaces/ItemInterface"


interface ItemReviewInterface extends ReviewInterface {
    item: ItemInterface
}





/************************** ADD MOCK DATA BELOW ***************/


// create list of mock items
const mockItem: ItemInterface = {
    id: 9,
    name: "Book",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'",
    rating: 2.5,
    category: "Books",
    description: "book",
    producerId: 1
}


const mockReviews = () => {
    const mockReview: ReviewInterface = {
        id: 1,
        itemId: 1,
        userId: 1,
        title: "My Review",
        body: "Very good item",
        rating: 5,
        username: "big",
        score: 5
    }   

    const itemReviews: ItemReviewInterface [] = []
    for(let i = 0; i < 7; i++) {

        itemReviews.push({
            ...mockReview, 
            id: mockReview.id as number + i,
            title: `${mockReview.title} ${i}`,
            item: mockItem
        })
    }

    return itemReviews;
}


/************************** DELETE MOCK DATA ABOVE **********/
 




/*
    This componenet will display a list reviews
    If the role of user logged in is a user it will display the reviews of the user
    If the role of user logged in is an admin it will display all reviews
*/
const ReviewList: React.FC<{}> = () => {

    // state to store collection
    const [ itemReviews, setItemReviews ] = React.useState([] as ItemReviewInterface[])

 
    // get current user from UserContext
    const { currentUser } = React.useContext(UserContext)
    console.log(`CURRENT USER: ${JSON.stringify(currentUser)}`)
    const { jwt } = currentUser as  UserInterface
    const userRole = currentUser?.role == "USER" ? "user" : "admin"


    // get reviews on component rendering
    React.useEffect((): void => {

        // function to get collection of user
        const getReviews = async () => {

            const reviews: unknown = userRole == "user"
                // TODO add API calls
                // if the role is user only get the items of the current user
                // ? await getCollection(jwt)
                // if the role is admin get all items
                // : await getAllItems(jwt)

            // set collection state
            setItemReviews(reviews as ItemReviewInterface[])

        }

        
//         // TODO uncomment invoking getCollection()
//         // invoke getCollection function
//         // getUserCollection()

        // TODO REMOVE line below
        // setReviews()

        setItemReviews(mockReviews())


    }, [])

    console.log(JSON.stringify(itemReviews))

    return currentUser
    ?  (
        <>
        <Container className="mt-4 r-flex">
            <Row className="justify-content-evenly" >
                {/* display reviews */}
                {itemReviews
                    // filter items based on nameFilter
                    .map(itemReview => {
                    return (
                     <Review 
                         key = {itemReview.id}
                         itemReview = { itemReview } 
                        //  handleDeleteItem= { handleDeleteItem }
                     />
                )
                })}
            </Row>
        </Container> 
        </>
    )
    : <Login />
}

export default ReviewList