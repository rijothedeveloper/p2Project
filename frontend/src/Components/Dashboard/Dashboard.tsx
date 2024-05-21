import React, { useContext, useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap"
import { UserContext } from "../../Contexts/UserContext";
import ReviewList from "./ReviewList";
import CollectionList from "./CollectionList";
import { Login } from "../Login/Login";
// interfaces
import { ItemInterface } from "../../Interfaces/ItemInterface"
import { ReviewInterface } from "../../Interfaces/ReviewInterface"
// for making api calls
import { apiURL, buildAuthHeader } from "../../FrontendAPI/api"
import axios, { AxiosError, AxiosResponse } from "axios";
import { getAllItemsEndpoint } from "../../FrontendAPI/api"
import { myCollectionEndpoint } from "../../FrontendAPI/api"
import { deleteItemEndpoint } from "../../FrontendAPI/api"
import { getCollection } from "../../FrontendAPI/api";


export const Dashboard: React.FC = () => {

    // COMPONENT STATE
    // Current view state - defaults to myCollection
    const [currentView, setCurrentView] = useState("myCollection");
      // state to store collection
      const [ collection, setCollection ] = React.useState([] as ItemInterface[])
      // get reviews by user
      const [ reviews, setReviews ] = React.useState([] as ReviewInterface[])

    // CURRENT USER
    // get current user from UserContext
    const { currentUser } = React.useContext(UserContext)
    console.log(`CURRENT USER: ${JSON.stringify(currentUser)}`)
    // get role and jwt of current user
    const jwt = currentUser ? currentUser.jwt : null
    
    const userRole = currentUser?.role == "USER" ? "user" : "admin"
    

    /**
     * Handles the select view on change to change the current view in the dashboard
     * @param input - select input value
     */
    const handleSelectViewOnChange = (input: React.ChangeEvent<HTMLSelectElement>) => {
        const view: string = input.target.value;
        switch (view) {
            case "myCollection":
                // TODO: add function to get collection items for logged in users
                setCurrentView("myCollection");
                break;
            case "myReviews":
                // TODO: add function to get review items for logged in users
                setCurrentView("myReviews");
                break;
            default:
                // This should never run, but just in case
                alert("Invalid view type!");
                break;
        }
    };

    const handleDeleteItem = (itemId: number) => {

        console.log(`ITEM ID TO DELETE: ${itemId}`)

        // delete item form database
        // api call to delete item
        const deleteItem = async () => {
            // console.log(`ITEM ID TO DELETE: ${itemId}`)
            const url = `${apiURL(deleteItemEndpoint)}/${itemId}`;
            // console.log(`URL TO DELETE ITEM: ${url}`)
            const authHeader = buildAuthHeader(currentUser?.jwt as string);
            const response = await axios.delete(url, {headers: authHeader})
            .then((response: AxiosResponse) => {
                return response.data;
            })
            .catch((error: AxiosError) => {
                console.log(`ERROR IN DELETE ITEM: ${error}`)
            });

        }
        // call delete item api call
        deleteItem()

        // update collection state
        // create new collection with the deleted item removed
        const updatedCollection = collection.filter(item => item.id != itemId)
        // update collection state
        setCollection(updatedCollection)
    }    


    // function to handle edit review
    const handleEditReview = (review: ReviewInterface) => {

        // update review in the database
        // console.log(`REVIEW TO UPDATE: ${JSON.stringify(review)}`)

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


    // get collection and reviews on component rendering
    React.useEffect(() => {
        
        console.log(`CURRENT USER: ${JSON.stringify(currentUser)}`)
        console.log(`JWT: ${jwt}`)

        if (!currentUser) return;

        // get collection of user
        const getUserCollection = async () => {
            // get collection from backend

            // const endpoint = userRole == "user" ? myCollectionEndpoint : getAllItemsEndpoint
            const response = getCollection(currentUser?.jwt as string)
            .then((response) => {
                // console.log(`RESPONSE FROM BACKEND: ${JSON.stringify(response.data)}`)
                // set collection state
                setCollection(response as ItemInterface[])
            })
            .catch((error: AxiosError) => {
                console.log(`AXIOS ERROR IN GET COLLECTION: ${error}`)
            });    
        }
        getUserCollection()

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // //TODO REMOVE SETTING MOCK COLLECTION FOR USER
        // if(userRole == "user") setCollection(mockCollection)
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


        // get reviews from backend
        const  getReviews = async () => {

            // get review from backend
            const endpoint = userRole == "user" ? "/reviews/user": "/reviews"
            const url = userRole == "user" ?  `${apiURL(endpoint)}/${currentUser?.id}` : `${apiURL(endpoint)}`;
            const authHeader = buildAuthHeader(jwt as string);
            const response = await axios.get(url, {headers: authHeader})
            .then((response: AxiosResponse) => {
                // console.log(`RESPONSE FROM BACKEND: ${JSON.stringify(response.data)}`)
                // set reviews state
                setReviews(response.data as ItemInterface[])
            })
            .catch((error: AxiosError) => {
                console.log(`AXIOS ERROR IN GET COLLECTION: ${error}`)
            });
        }
        getReviews()

    }, [currentUser]);

    return currentUser 
    ?  (
        <>
            <Container id="profile-container">
                {/* Can add logged in user information here */}
            </Container>
            <Container id="select-view-container">
                <Form id="select-view-form">
                    <Form.FloatingLabel label="Select View" controlId="dashboard-select-view" onChange={handleSelectViewOnChange}>
                        <Form.Select id="selectMyView" defaultValue="myCollection">
                            <option value="myCollection">My Collection</option>
                            <option value="myReviews">My Reviews</option>
                        </Form.Select>
                    </Form.FloatingLabel>
                </Form>
            </Container>
            <Container id="collection-review-container">
                {/* Conditionally render my collection or my reviews based on currentView */}
                { currentView === "myCollection"
                ? <CollectionList
                    collection={collection} 
                    reviews={reviews}
                    handleDeleteItem={handleDeleteItem}
                    handleEditReview={handleEditReview}
                    />
                : <ReviewList
                    reviews={reviews}
                    handleEditReview={handleEditReview}
                    />
                }
            </Container>
        </>
    )
    : <Login />
}