import { Button, Card, Col, Container, Row } from "react-bootstrap"
import { ItemInterface } from "../../Interfaces/ItemInterface"
import { capitalize, truncateText } from "../../Utils/StringUtils"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../Contexts/UserContext"
import { addItemToCollection, getCollectionItem, removeItemFromCollection } from "../../FrontendAPI/api"
import { useNavigate } from "react-router-dom"
import { CreateReviewModal } from "../Review/CreateReviewModal"
import { BsStarFill } from "react-icons/bs"
import { DisplayPartialStars } from "../Review/DisplayPartialStars"
import { useToast } from "../../Contexts/ToastContext"

export const ItemColumns: React.FC<{items: ItemInterface[]}> = ({items}) => {

    const { currentUser } = useContext(UserContext);
    const { addToast } = useToast();
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const navigate = useNavigate();

    const [inCollection, setInCollection] = useState<{[key:number]:Boolean}>({});

    const addToCollection = async (item: ItemInterface) => {
        const response = await addItemToCollection(currentUser?.jwt as string, item);
        if (!response.status) {
            console.error(response.message);
            addToast(response.message, true, new Date());
            //alert(response.message);
        } else {
            console.log(response.message);
            addToast(response.message, false, new Date());
            //alert(response.message);
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
            addToast(response.message, true, new Date());
            //alert(response.message);
        } else {
            console.log(response.message);
            addToast(response.message, false, new Date());
            //alert(response.message);
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
    // function to determine color of rating
    const ratingColor = (rating: number) => {
        if(rating as number >= 4) return "text-success";
        if(rating as number >= 3) return "text-primary";
        if(rating as number >= 2) return "text-warning"
        return "text-danger"
    }

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
        <Row md={2} className="g-2">
            {items.map((item, idx) => {
                return (
                    <Col key={idx}>
                        <Card className="h-100">
                            <Card.Header>{item.category}</Card.Header>
                            <Container className="ratio ratio-1x1">
                                <Card.Img className="rounded-0" variant="top" src={item.image} alt={item.name}/>
                            </Container>
                            <Card.Body>
                                <div className="d-flex flex-column h-100">
                                    <Card.Subtitle className="text-secondary">{item.producer?.name}</Card.Subtitle>
                                    <Card.Title className="fs-5">{capitalize(item.name)}</Card.Title>
                                    <Card.Text>
                                        {truncateText(item.description, 50)}
                                    </Card.Text>
                                    <div className="flex-fill">
                                        <div className="d-flex h-100 align-items-end">
                                            <div className="flex-fill">
                                                <Row className="g-0">
                                                    <Col md={4}>
                                                        <DisplayPartialStars rating={item.rating as number}/>
                                                    </Col>
                                                    <Col className="ms-2">
                                                        <span id="rating" className={ratingColor(item.rating as number)}>{`(${item.rating?.toFixed(1)})`}</span>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                            <Card.Footer>
                                {inCollection[item.id as number] ? (
                                    <Button size="sm" variant="outline-danger" onClick={async () => {await deleteFromCollection(item.id as number)}}>Remove</Button>
                                ) : (
                                    <Button size="sm" variant="outline-success" onClick={async () => {await addToCollection(item)}}>Add</Button>
                                )}
                                <Button className="ms-2" size="sm" variant="outline-info" onClick={() => navigate(`/item/${item.id as number}`)}>Details</Button>
                                <Button className="ms-2" size="sm" variant="outline-primary" onClick={openModal} >Review Item</Button>
                                <CreateReviewModal isOpen={isReviewModalOpen} onClose={closeModal} itemIdToPass={item.id as number}/>
                            </Card.Footer>
                        </Card>
                    </Col>
                )
            })}
        </Row>
    )
}