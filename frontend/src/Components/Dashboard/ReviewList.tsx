import * as React from "react"
import { UserContext } from "../../Contexts/UserContext"
import { Container, Row, Form } from "react-bootstrap"
import { UserContextInterface } from "../../Interfaces/UserContextInterface"
import { ReviewInterface } from "../../Interfaces/ReviewInterface"
import Review from "./ItemReview"
import { UserInterface } from "../../Interfaces/UserInterface"
import { Login } from "../Login/Login"
import { ItemInterface } from "../../Interfaces/ItemInterface"
// import { getAllReveiwsByUserId } from "../../FrontendAPI/api"
import { apiURL, buildAuthHeader } from "../../FrontendAPI/api"
import axios, { AxiosError, AxiosResponse } from "axios";


/*
    This componenet will display a list reviews
    If the role of user logged in is a user it will display the reviews of the user
    If the role of user logged in is an admin it will display all reviews
*/
const ReviewList: React.FC<{}> = () => {

    // state to store collection
    const [ itemReviews, setItemReviews ] = React.useState([] as ReviewInterface[])
 
    // get current user from UserContext
    const { currentUser } = React.useContext(UserContext)
    // console.log(`CURRENT USER: ${JSON.stringify(currentUser)}`)
    const { jwt } = currentUser as  UserInterface
    const userRole = currentUser?.role == "USER" ? "user" : "admin"


    // function to handle edit item
    const handleEditReview = (review: ReviewInterface) => {

        // update review in the database
        console.log(`REVIEW TO UPDATE: ${JSON.stringify(review)}`)

        // delete item form database
        // api call to delete item
        const updateReview = async () => {
            const endpoint = "/reviews"
            const url = `${apiURL(endpoint)}/${review.id as number}`
            console.log(`URL: ${url}`)  
            const authHeader = buildAuthHeader(jwt as string);
            const response = await axios.put(
                url, {
                    title: review.title,
                    body: review.body,
                    itemId: review.itemId,
                    rating: review.rating,
                }
                ,
                {headers: authHeader})
            .then((response: AxiosResponse) => {
                return response.data;
            })
            .catch((error: AxiosError) => {
                console.log(`ERROR IN UPDATE ITEM: ${error}`)
            });

        }
        // call delete item api call
        updateReview()

    }


    // get reviews on component rendering
    React.useEffect((): void => {

        let reivewsInput = [] as ReviewInterface[]
        // function to get collection of user
        let  getReviews = async () => {

            // TODO get endpoint for admin
            const endpoint = userRole == "user" ? "/reviews/user": "/reviews"
            const url = userRole == "user" ?  `${apiURL(endpoint)}/${currentUser?.id}` : `${apiURL(endpoint)}`;
            console.log(`URL: ${url}`)  
            const authHeader = buildAuthHeader(jwt as string);
            const response = await axios.get(url, {headers: authHeader})
            .then((response: AxiosResponse) => {
                console.log(`RESPONSE FROM BACKEND: ${JSON.stringify(response.data)}`)
                reivewsInput = response.data
            })
            .catch((error: AxiosError) => {
                console.log(`AXIOS ERROR IN GET COLLECTION: ${error}`)
            });
            
            // console.log(`REVIEWS INPUT: ${JSON.stringify(reivewsInput)}`)
            setItemReviews(reivewsInput as ItemInterface[]) 

        }

        getReviews()
        
    }, [])

    // console.log(JSON.stringify(itemReviews))

    return currentUser
    ?  (
        <>
        <Container className="mt-4 r-flex">
            <Row className="justify-content-evenly" >
                {/* display reviews */}
                {itemReviews && itemReviews
                    // filter items based on nameFilter
                    .map(itemReview => {
                    return (
                     <Review 
                         itemReview = { itemReview } 
                         handleEditReview = { handleEditReview }
                         key={itemReview.id}
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
