import * as React from "react"
import CollectionItem from "./CollectionItem"
import { UserContext } from "../../Contexts/UserContext"
import { Container, Row, Form } from "react-bootstrap"
import { ItemInterface } from "../../Interfaces/ItemInterface"
import { Login } from "../Login/Login"



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
const Collection: React.FC<{
    collection : ItemInterface[]
    handleDeleteItem: (itemId: number) => void
}> = ({collection, handleDeleteItem}) => {

    const [ nameFilter, setNameFilter ] = React.useState("")
    // get current user from UserContext
    const { currentUser } = React.useContext(UserContext)
    // console.log(`CURRENT USER: ${JSON.stringify(currentUser)}`)

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