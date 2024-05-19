import * as React from "react"
import CollectionItem from "./CollectionItem"
import { UserContext } from "../../Contexts/UserContext"
import { Container, Row, Form } from "react-bootstrap"
import { UserContextInterface } from "../../Interfaces/UserContextInterface"
// import { getAllItems } from "../../FrontendAPI/api"
import { ItemInterface } from "../../Interfaces/ItemInterface"
import { baseURL, getCollection } from "../../FrontendAPI/api"
import { UserInterface } from "../../Interfaces/UserInterface"
import { Login } from "../Login/Login"
import { apiURL, buildAuthHeader } from "../../FrontendAPI/api"
import axios, { AxiosError, AxiosResponse } from "axios";
import { getAllItemsEndpoint } from "../../FrontendAPI/api"
import { myCollectionEndpoint } from "../../FrontendAPI/api"
import { getAllItems } from "../../FrontendAPI/api"
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses"
import { deleteItemEndpoint } from "../../FrontendAPI/api"


/***** TODO REMOVE MOCK DATA AREA BELOW ****************************/

// create list of mock items
// const item: ItemInterface = {
//     id: 9,
//     name: "Book",
//     image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'",
//     rating: 2.5,
//     category: "Books",
//     description: "book",
//     producerId: 1
// }

// const itemNames = ["Book", "Laptop", "Phone", "Tablet", "Headphones", "Keyboard", "Mouse"]

// const mockCollection: ItemInterface[] = [];
// for(let i = 0; i < 7; i++) {
//     mockCollection.push({
//         id: item.id as number + i, 
//         image: item.image,
//         name: itemNames[i],
//         rating: item.rating as number + i*0.3,
//         category: item.category,
//         description: item.description,
//         producerId: item.producerId
//     })
// }
/***** TODO REMOVE MOCK DATA AREA ABOVE ****************************/



/*
    This componenet will display a list items aka collection
    If the role of user logged in is a user it will display the items of the user
    If the role of user logged in is an admin it will display all items
*/  
const Collection: React.FC<{}> = () => {

    // state to store collection
    const [ collection, setCollection ] = React.useState([] as ItemInterface[])
    // state to store input entered into select items by name
    const [ nameFilter, setNameFilter ] = React.useState("")
    // get current user from UserContext
    const { currentUser } = React.useContext(UserContext)
    console.log(`CURRENT USER: ${JSON.stringify(currentUser)}`)


    // get role and jwt of current user
    // desctructuring causes error due to currentUser being null
    // const { role, jwt } = currentUser as  UserInterface
    const jwt = currentUser ? currentUser.jwt : null
    const userRole = currentUser?.role == "USER" ? "user" : "admin"


    const handleDeleteItem = (itemId: number) => {

        console.log(`ITEM ID TO DELETE: ${itemId}`)

        // delete item form database
        // api call to delete item
        const deleteItem = async () => {
            const baseurl = baseURL ? baseURL : "http://localhost:8080"
            // console.log(`BASEURL: ${baseurl}`)
            const endpoint = deleteItemEndpoint ? deleteItemEndpoint : "/items"
            // console.log(`ENDPOINT: ${endpoint}`)
            // console.log(`ITEM ID TO DELETE: ${itemId}`)
            const url = `${baseurl}${deleteItemEndpoint}/${itemId}`;
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


    // get collection on component rendering
    React.useEffect((): void => {

        // // function to get collection of user
        const getUserCollection = async () => {

            console.log(`USER ROLE: ${userRole}`)

            // set collection state

            // WITH FETCHING HERE
            const endpoint = userRole == "user" ? myCollectionEndpoint : getAllItemsEndpoint
            const url = apiURL(endpoint);
            const authHeader = buildAuthHeader(jwt as string);
            const response = await axios.get(url, {headers: authHeader})
            .then((response: AxiosResponse) => {
                console.log(`RESPONSE FROM BACKEND: ${JSON.stringify(response.data)}`)
                // collectionInput = response.data
                setCollection(response.data as ItemInterface[])
            })
            .catch((error: AxiosError) => {
                console.log(`AXIOS ERROR IN GET COLLECTION: ${error}`)
            });


            // WITH USING API CALL FROM API.TS NOT WORKING RIGHT NOW
        //     if(userRole == "user"){
        //         const response: unknown = await getCollection(jwt as string)
        //         .then((response) => {
        //             console.log(`TYPE OF RESPONsSE: ${typeof response}`)
        //             console.log(`RESPONSE IN COLLECTION: ${JSON.stringify(response)}`)
        //             // setCollection(response as ItemInterface[])
        //         })
        //         .catch((error) => {
        //             console.log(`ERROR IN GET COLLECTION: ${error}`)
        //         })
        //     } else if(userRole == "admin") {
        //         const response = await getAllItems(jwt as string)
        //         .then(response => {
        //             console.log(`TYPE OF RESPONSE: ${typeof response}`)
        //             console.log(`RESPONSE IN COLLECTION: ${JSON.stringify(response)}`)
        //             // setCollection(response as ItemInterface[])
        //         })
        //         .catch((error) => {
        //             console.log(`ERROR IN GET COLLECTION: ${error}`)
        //         })
        //     } else {
        //         setCollection([])
        //     }

    }

        // // DID NOT WORK
        // const getData = async () => {
        //     const response : unknown = await getAllItems(currentUser?.jwt as string);
        //     if (typeof response === "string") {
        //         console.error(response);
        //         setCollection([]);
        //     } else {
        //         console.log(response);
        //         console.log(`RESPONSE with new way COLLECTION: ${JSON.stringify(response)}`)
        //         setCollection(response as ItemInterface[]);
        //     }
        // };



         
        getUserCollection()
        // getData();

    }, [])


    // function to handle change in name filter input
    const handleNameFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameFilter(e.target.value)
    }

    
    return currentUser
    ? (
        <>
             <Container className="mt-4 r-flex">
                <Row className="">
                    <Form.Label htmlFor="nameFilter"> Filter By Item Name: {  }
                        <Form.Control 
                        type="text"
                        id="nameFilter"
                        value={nameFilter}
                        onChange={handleNameFilterChange}
                    />
                    </Form.Label>

                </Row>
                 <Row className="justify-content-evenly" >
                     {/* display collection items */}
                     {collection && collection
                         // filter items based on nameFilter
                         .filter(item => item.name.toLowerCase().indexOf(nameFilter.toLowerCase())> -1)
                         .map(item => {
                            // console.log(`ITEM: ${JSON.stringify(item)}`)
                         return (
                             <CollectionItem 
                                 key = { item.id }
                                 item = { item } 
                                 handleDeleteItem= { handleDeleteItem }
                             />
                        )
                     })}
                 </Row>
             </Container> 
        </>
    )
    : <Login />
}

export default Collection