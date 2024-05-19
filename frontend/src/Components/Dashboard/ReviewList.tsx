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
import { get } from "http"


interface ItemReviewInterface extends ReviewInterface {
    item: ItemInterface
}





/************************** ADD MOCK DATA BELOW ***************/


// REVIWER API
// const getAllRevewsByUserIdEndpoint = "/reviews";

// /**
//  * Get All Reviews by User ID
//  * @param token - JWT token
//  * @param userId- ID of the user to fetch reviews for
//  */
// export const getAllReveiwsByUserId = async (token: string, userId: number) => {
//     const url = apiURL(`${deleteReviewEndpoint}/${userId}`);
//     const authHeader = buildAuthHeader(token);
//     const response = await axios.get(url, {headers: authHeader})
//     .then((response: AxiosResponse) => {
//         return response.data;
//     })
//     .catch((error: AxiosError) => {alert(error)});
// };


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
    // const [ itemReviews, setItemReviews ] = React.useState([] as ItemReviewInterface[])
    const [ itemReviews, setItemReviews ] = React.useState([] as ReviewInterface[])
 
    // get current user from UserContext
    const { currentUser } = React.useContext(UserContext)
    // console.log(`CURRENT USER: ${JSON.stringify(currentUser)}`)
    const { jwt } = currentUser as  UserInterface
    const userRole = currentUser?.role == "USER" ? "user" : "admin"


    // function to build item reviews by getting the item by id from backend
    // and adds it as a property to the review
    // const buildItemReviews  = async (reviews: ReviewInterface[]) => {
    //    // get item by id from backend
    //    let itemObject: ItemInterface = {} as ItemInterface

    //    const getItemById = async (itemId: number) => {
    //           const url = apiURL(`/items/id/${itemId}`)
    //           const authHeader = buildAuthHeader(jwt as string)
    //           const response = await axios.get(url, {headers: authHeader})
    //           .then((response: AxiosResponse) => {
    //             console.log(`RESPONSE ITEM  FROM BACKEND: ${JSON.stringify(response.data)}`)
    //             itemObject = {... response.data}
    //             console.log(`ITEM AFTER: ${JSON.stringify(itemObject)}`)
    //           })
    //           .catch((error: AxiosError) => {
    //             console.log(`AXIOS ERROR IN GET ITEM BY ID: ${error}`)
    //           })    
    //     }

    //     let builtReviews: unknown = []
    //     const addItemObject =  async () => {
    //         builtReviews = await reviews
    //             .map(async (review) => { 
    //                 await getItemById(review.itemId as number)
    //                 const reviewItem = {
    //                     ...review,
    //                     item: itemObject
    //                 }
    //                 // return {
    //                 //     ...review,
    //                 //     item: itemObject
    //                 // }
    //                 console.log(`IN MAP REVIEW ITEM: ${JSON.stringify(reviewItem)}`)
    //                 return reviewItem
    //         })
    //         console.log(`BUILT REVIEWS before returning: ${JSON.stringify(builtReviews)}`)
    //     }
    //     // await addItemObject()
    //     // setItemReviews(builtReviews as ItemReviewInterface[])
    //     console.log(`BUILT REVIEWS from reviewBuilder: ${JSON.stringify(builtReviews)}`)
    //     return builtReviews
    // }

    // get reviews on component rendering
    React.useEffect((): void => {

        let reivewsInput = [] as ReviewInterface[]
        // function to get collection of user
        let  getReviews = async () => {

            // TODO get endpoint for admin
            const endpoint = userRole == "user" ? "/reviews/user": "/reviews/user"
            const url = `${apiURL(endpoint)}/${currentUser?.id}`;
            console.log(`URL: ${url}`)  
            const authHeader = buildAuthHeader(jwt as string);
            const response = await axios.get(url, {headers: authHeader})
            .then((response: AxiosResponse) => {
                console.log(`RESPONSE FROM BACKEND: ${JSON.stringify(response.data)}`)
                // collectionInput = response.data
                // setItemReviews(response.data as ItemInterface[])
                reivewsInput = response.data
            })
            .catch((error: AxiosError) => {
                console.log(`AXIOS ERROR IN GET COLLECTION: ${error}`)
            });
            
            console.log(`REVIEWS INPUT: ${JSON.stringify(reivewsInput)}`)
            // const builtReviews = await buildItemReviews(reivewsInput)
            // console.log(`BUILT REVIEWS After passing reviews input: ${JSON.stringify(builtReviews)}`)
            setItemReviews(reivewsInput as ItemInterface[]) 

        }

        getReviews()

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
