import { Button, Card, Col, Row } from "react-bootstrap"
import { ItemInterface } from "../../Interfaces/ItemInterface"
import { capitalize, truncateText } from "../../Utils/StringUtils"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../Contexts/UserContext"
import { addItemToCollection, getCollectionItem, removeItemFromCollection } from "../../FrontendAPI/api"
import { useNavigate } from "react-router-dom"
import { CreateReviewModal } from "../Review/CreateReviewModal"

export const ItemColumns: React.FC<{items: ItemInterface[]}> = ({items}) => {

    const { currentUser } = useContext(UserContext);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const navigate = useNavigate();

    const [inCollection, setInCollection] = useState<{[key:number]:Boolean}>({});

    const addToCollection = async (item: ItemInterface) => {
        const response = await addItemToCollection(currentUser?.jwt as string, item);
        if (!response.status) {
            console.error(response.message);
            alert(response.message);
        } else {
            console.log(response.message);
            alert(response.message);
        }
    };
    const openModal = () => {
        setIsReviewModalOpen(true)
    }
    const closeModal = () => {
        setIsReviewModalOpen(false)
    }
    const deleteFromCollection = async (itemId: number) => {
        const response = await removeItemFromCollection(currentUser?.jwt as string, itemId);
        if (!response.status) {
            console.error(response.message);
            alert(response.message);
        } else {
            console.log(response.message);
            alert(response.message);
        }
    };
    const checkUserCollection = async (itemId: number) => {
        const response = await getCollectionItem(currentUser?.jwt as string, itemId, currentUser?.id as number);
        if (!response.status) {
            console.error(response.message);
            return response.status;
        } else {
            console.log(response.message);
            return response.status;
        }
    };

    useEffect(() => {
        const checkCollection = async () => {
            const collectionStatus: {[key: number]: boolean} = {};
            for (const item of items) {
                let isCollected = await checkUserCollection(item.id as number);
                collectionStatus[item.id as number] = isCollected;
            }
            setInCollection(collectionStatus);
        };
        checkCollection();
    }, [items])

    return (
        <Row md={3} className="g-2">
            {items.map((item, idx) => {
                return (
                    <Col key={idx}>
                        <Card className="h-100">
                            <Card.Header>{item.category}</Card.Header>
                            <Card.Img variant="top" src={item.image} alt={item.name}/>
                            <Card.Body>
                                <Card.Subtitle className="text-secondary">{item.producer?.name}</Card.Subtitle>
                                <Card.Title className="fs-5">{capitalize(item.name)}</Card.Title>
                                <Card.Text>
                                    {truncateText(item.description, 30)}
                                </Card.Text>
                                <Card.Text>
                                    {item.rating}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                {inCollection[item.id as number] ? (
                                    <Button variant="danger" onClick={async () => {await deleteFromCollection(item.id as number)}}>Remove from Collection</Button>
                                ) : (
                                    <Button variant="success" onClick={async () => {await addToCollection(item)}}>Add to Collection</Button>
                                )}
                                <Button className="ms-3" variant="info" onClick={() => navigate(`/item/${item.id as number}`)}>Details</Button>
                                <Button className="ms-3" onClick={openModal} >Review Item</Button>
                                <CreateReviewModal isOpen={isReviewModalOpen} onClose={closeModal} itemIdToPass={item.id as number}/>
                            </Card.Footer>
                        </Card>
                    </Col>
                )
            })}
        </Row>
    )
}