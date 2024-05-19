import { Button, Card, Col, Row } from "react-bootstrap"
import { ItemInterface } from "../../Interfaces/ItemInterface"
import { truncateText } from "../../Utils/StringUtils"
import { useContext } from "react"
import { UserContext } from "../../Contexts/UserContext"

export const ItemColumns: React.FC<ItemInterface[]> = (items) => {

    const { currentUser } = useContext(UserContext);

    return (
        <Row md={3}>
            {items.map((item, idx) => {
                return (
                    <Col key={idx}>
                        <Card className="h-100">
                            <Card.Header>{item.category}</Card.Header>
                            <Card.Img variant="top" src={item.image} alt={item.name}/>
                            <Card.Body>
                                <Card.Subtitle>{item.producer?.name}</Card.Subtitle>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>
                                    {truncateText(item.description, 30)}
                                </Card.Text>
                                <Card.Text>
                                    {item.rating}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Button>{}</Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                )
            })}
        </Row>
    )
}