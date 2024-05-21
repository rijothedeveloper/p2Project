import * as React from "react"
import CollectionItem from "./CollectionItem"
import { UserContext } from "../../Contexts/UserContext"
import { Modal, Card, Container, Row, Form, Button, Col } from "react-bootstrap"
import { ItemInterface } from "../../Interfaces/ItemInterface"
import { Login } from "../Login/Login"
import { ReviewInterface } from "../../Interfaces/ReviewInterface"
import { AddItem } from "../Items/AddItem"
import { ObjectsByName } from "../GeneralUse/ObjectsByName"

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
    handleUpdateItem: (item: ItemInterface) => void
}> = ({collection, handleDeleteItem, reviews, handleEditReview, handleUpdateItem}) => {

    const [ nameFilter, setNameFilter ] = React.useState("")
    const [ showAddItemModal, setShowAddItemModal ] = React.useState(false)
    // get current user from UserContext
    const { currentUser } = React.useContext(UserContext)
    // console.log(`CURRENT USER: ${JSON.stringify(currentUser)}`)

    // function to handle change in name filter input
    const handleNameFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameFilter(e.target.value)
    }

    // ADD ITEM FUNCTINOALITY
    const handleAddItemButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setShowAddItemModal(true)
    }   
   
    return currentUser
    ? (
        showAddItemModal
        ? (
            <>
            <Modal show={showAddItemModal} onHide={() => setShowAddItemModal(false)}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>    

                    <AddItem />
                    </Modal.Body>

            </Modal>
\        </>

        )
        : (
            <>
        <div className="mt-2">
            <ObjectsByName setNameFilter={setNameFilter} label="Filter by Name" />
        </div>
        <Container className="mt-2">
            <Button
                variant="primary" 
                onClick={handleAddItemButtonClick}
                hidden={currentUser?.role === "USER"}
            >Add Item</Button>
        </Container>
        <Container className="mt-4 r-flex">
            {/*<Row>
                <Col>
                    <Form.Label htmlFor="nameFilter"> Filter By Item Name: {  }
                        <Form.Control 
                        type="text"
                        id="nameFilter"
                        value={nameFilter}
                        onChange={handleNameFilterChange}
                        />
                    </ Form.Label>
                </Col>
                <Col>
                    <Button 
                        variant="primary" 
                        onClick={handleAddItemButtonClick}
                        hidden={currentUser?.role === "USER"}
                    >Add Item</Button>
                </Col>
            </Row>*/}
            <Row md={2} className="g-2">
                {/* display collection items */}
                {collection && collection
                    // filter items based on nameFilter
                    .filter(item => item.name.toLowerCase().indexOf(nameFilter.toLowerCase())> -1)
                    .map(item => {
                    // console.log(`ITEM: ${JSON.stringify(item)}`)
                    return (
                        <Col>
                            <CollectionItem 
                                key = { item.id }
                                item = { item } 
                                handleDeleteItem= { handleDeleteItem }
                                handleEditReview={handleEditReview}
                                reviews={reviews}
                                handleUpdateItem={handleUpdateItem}
                            />
                        </Col>
                    )
                })}
            </Row>
        </Container> 
        </>
        )
    )
    : <Login />
}

export default Collection
