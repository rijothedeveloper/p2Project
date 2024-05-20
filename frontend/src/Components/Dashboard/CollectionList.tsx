import * as React from "react"
import CollectionItem from "./CollectionItem"
import { UserContext } from "../../Contexts/UserContext"
import { Container, Row, Form } from "react-bootstrap"
import { ItemInterface } from "../../Interfaces/ItemInterface"
import { Login } from "../Login/Login"
import { ReviewInterface } from "../../Interfaces/ReviewInterface"


/*
    This componenet will display a list items aka collection
    If the role of user logged in is a user it will display the items of the user
    If the role of user logged in is an admin it will display all items
*/  
const Collection: React.FC<{
    collection : ItemInterface[]
    reviews : ReviewInterface[]
    handleDeleteItem: (itemId: number) => void
    handleEditReview: (review: ReviewInterface) => void
}> = ({collection, handleDeleteItem, reviews, handleEditReview}) => {

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
                                 handleEditReview={handleEditReview}
                                 reviews={reviews}
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