import * as React from "react"
import { UserContext } from "../../Contexts/UserContext"
import { Container, Row, Form } from "react-bootstrap"
import { UserContextInterface } from "../../Interfaces/UserContextInterface"
// import { CurrentUserInterface } from "../../Interfaces/CurrentUserInterface"
import { ReviewInterface } from "../../Interfaces/ReviewInterface"
// import Review from "./Review"
import { UserInterface } from "../../Interfaces/UserInterface"



/***** TODO REMOVE MOCK DATA AREA BELOW ****************************/


// create mock user
const user = {
    id: 1,
    // role: "admin"
    role: "user",
    jwt: "token"
}

const { role, jwt } = user as UserInterface
/***** TODO REMOVE MOCK DATA AREA ABOVE ****************************/



/*
    This componenet will display a list reviews
    If the role of user logged in is a user it will display the reviews of the user
    If the role of user logged in is an admin it will display all reviews
*/
const ReviewList: React.FC<{}> = () => {

    // state to store collection
    const [ reviews, setReviews ] = React.useState([] as ReviewInterface[])

    // const navigate = useNavigate();

 
    //  TODO UNCOMMENT BELOW
    // get current user from UserContext
    const { currentUser } = React.useContext(UserContext)
    console.log(`CURRENT USER: ${currentUser}`)

    // if a user is not logged in navigate to home page
    // if (!currentUser) {
    //     navigate("/");
    // }

    // get role of current user
    // const { role, jwt } = currentUser as  CurrentUserInterface


    // get reviews on component rendering
    React.useEffect((): void => {

        // function to get collection of user
        const getReviews = async () => {

            const reviews: unknown = role == "user"
                // TODO add API calls
                // if the role is user only get the items of the current user
                // ? await getCollection(jwt)
                // if the role is admin get all items
                // : await getAllItems(jwt)

            // set collection state
            setReviews(reviews as ReviewInterface[])
        }

        
//         // TODO uncomment invoking getCollection()
//         // invoke getCollection function
//         // getUserCollection()

        // TODO REMOVE line below
        // setReviews()

    }, [])



    return (
        <>
             <Container className="mt-4 r-flex">
                 <Row className="justify-content-evenly" >
                     {/* display reviews */}
                     {reviews
                         // filter items based on nameFilter
                         .map(review => {
                         return (
                            //  <Review 
                            //     //  key = { }
                            //      review = { review } 
                            //     //  handleDeleteItem= { handleDeleteItem }
                            //  />
                            <p>review list</p>
                        )
                     })}
                 </Row>
             </Container> 
        </>
    )
}

export default ReviewList
