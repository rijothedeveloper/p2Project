import * as React from "react"
import axios from "axios"
import CollectionItem from "./CollectionItem"
import { UserContext } from "../../Contexts/UserContext"
import { useNavigate } from "react-router-dom"
import { Container, Row } from "react-bootstrap"
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
    This componenet will display the items of the user aka collection
    Will determine the useContext
*/

// TODO : delete if we use context
// const Collection: React.FC<{
//     userId: number
// }> = ({userdId}) {


const Collection: React.FC<{}> = () => {


    // state to store collection
    const [ collection, setCollection ] = React.useState([] as ItemInterface[])
    // // get current user from UserContext
    // const { currentUser } = React.useContext(UserContext)

    // const navigate = useNavigate();
    // // if a user is not logged in navigate to home page
    // if (!currentUser) {
    //     navigate("/");
    // }

    // TODO delete mock user
    /****************** CREATE MOCK USER BELOW *********************/
    const currentUser = {
        id: 1,
        role: "admin"
    }
    /******************* CREATE MOCK USER ABOVE *******************/


    // get role of current user
    const userRole = currentUser.role

    // title variable used as the header for the component
    // TODO not used at the moment delete if it is still the case
    // const title = "Collection"

    // TODO get baseUrl frmo useConstext
    const baseUrl = "localhost:3000"


    const handleDeleteItem = (itemId: number) => {
        // create new collection with the deleted item removed
        const updatedCollection = collection.filter(item => item.id != itemId)
        // update collection state
        setCollection(updatedCollection)
    }


    // get collection on component rendering
    React.useEffect((): void => {

        // function to get collection of user
        const getCollection = async () => {

            // TODO set url to proper endpoints
            // set url based on user role
            const url = userRole == "user"
                // if the role is user only get the items of the current user
                ? `${baseUrl}/items/${currentUser.id}`
                // if the role is admin get all items
                : `${baseUrl}/items`
    
            try {
                // fetch collection from server
                const { data, status } = await axios(url)
                // if fetch was successfull setCollection to data received
                if ( status === 200 ) {
                    setCollection(data)
                }
                // TODO add other catch?
            } catch (e) {
                // TODO check how to handle error
                console.log("Error fetching collection.")
            }
        }

        // TODO remove mock data below
        /***************************  ADD MOCK COLLECTION DATA BELOW  ****************************/
        const item: ItemInterface = {
            id: 9,
            image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'",
            name: "Book",
            rating: 4.2
        }
        
        const mockCollection: ItemInterface[] = [];
        for(let i = 0; i < 7; i++) {
            mockCollection.push({...item, id: item.id + i})
        }
        /***************************  ADD MOCK DATA  ABOVE ****************************/
        
        // TODO uncomment invoking getCollection()
        // set collection state
        // invoke getCollection function
        // getCollection()

        // TODO remove line below
        setCollection(mockCollection)

    }, [])


    return (
        <>
            <Container className="mt-4 d-flex">
                <Row className="justify-content-evenly" >
                    {/* display collection items */}
                    {collection.map(item => {
                        return (
                            <CollectionItem 
                                key = { item.id }
                                item = { item } 
                                handleDeleteItem= { handleDeleteItem }
                            />)
                    })}
                </Row>
            </Container>
        </>
    )
}

export default Collection
