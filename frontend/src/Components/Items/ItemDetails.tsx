import { useContext, useEffect, useState } from "react"
import { ItemInterface } from "../../Interfaces/ItemInterface"
import { useParams } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import { Accordion, Col, Container, Image, ListGroup, Row } from "react-bootstrap";
import { getAllRepliesByReview, getItemById, getItemReviews } from "../../FrontendAPI/api";
import { ReviewInterface } from "../../Interfaces/ReviewInterface";
import { ReplyInterface } from "../../Interfaces/ReplyInterface";

export const ItemDetails: React.FC = () => {

    const { itemId } = useParams<{itemId: string}>();
    const { currentUser } = useContext(UserContext);

    const [item, setItem] = useState<ItemInterface>();
    const [reviews, setReviews] = useState< ReviewInterface[]>([]);
    const [replies, setReplies] = useState<{[key: number]: ReplyInterface[]}>({});

    // Get item by itemId
    const fetchItemById = async () => {
        const response = await getItemById(currentUser?.jwt as string, Number.parseInt(itemId as string));
        if (!response.status) {
            console.error(response.message);
            alert(response.message);
        } else {
            console.log(response.message);
            setItem(response.data);
        }
    };
    // Get reviews by itemId
    const fetchReviewsbyItem = async () => {
        const response = await getItemReviews(currentUser?.jwt as string, Number.parseInt(itemId as string));
        if (!response.status) {
            console.error(response.message);
            alert(response.message);
        } else {
            console.log(response.message);
            setReviews(response.data);
        }
    };
    // Get replies by reviewId
    const fetchRepliesByReview = async (reviewId: number) => {
        const response = await getAllRepliesByReview(currentUser?.jwt as string, reviewId);
        if (!response.status) {
            console.error(response.message);
            alert(response.message);
            return [];
        } else {
            console.log(response.message);
            return response.data
        }
    };
    // Set rating text color
    const ratingColor = (rating: number) => {
        if(rating >= 4) return "text-success";
        if(rating >= 3) return "text-primary";
        if(rating >= 2) return "text-warning"
        return "text-danger"
    }

    // Get item at itemId
    useEffect(() => {
        if (currentUser) {
            fetchItemById();
        }
    }, [currentUser]);
    // Get reviews for item at itemID
    useEffect(() => {
        // only run if both currentUser and itemId are "truthy"
        if (currentUser && itemId) {
            fetchReviewsbyItem();
        }
    }, [itemId ,currentUser]);
    // Get replies for each review
    useEffect(() => {
        if (reviews) {
            const buildReplyCollection = async () => {
                const replyCollection: {[key: number]: ReplyInterface[]} = {};
                for (const review of reviews) {
                    let replyList = await fetchRepliesByReview(review.id as number);
                    replyCollection[review.id as number] = replyList;
                }
                setReplies(replyCollection);
            };
            buildReplyCollection();
        }
    }, [reviews]);

    return (
        <Container>
            <h1>{item?.name}</h1>
            <Container id="itemDetailsContainer">
                <Row>
                    <Col md={6}>
                        <Container>
                            <Image src={item?.image} alt={item?.name} fluid />
                        </Container>
                    </Col>
                    <Col md={6}>
                        <h2 className="fs-3">{item?.category}</h2>
                        <p className="text-secondary">{item?.producer?.name}</p>
                        <hr />
                        <p>{item?.description}</p>
                        <p className={ratingColor(item?.rating as number)}>{item?.rating}</p>
                    </Col>
                </Row>
            </Container>
            <Container id="reviewContainer">
                <Accordion>
                    {reviews.map((review, idx) => {
                        return (
                            <Accordion.Item eventKey={`${idx}`}>
                                <Accordion.Header>
                                    <h3 className="fs-4">{review.title}</h3>
                                    <p className="text-wrap">
                                        {review.body}
                                        <span className="text-secondary"> - {review.username}</span>
                                    </p>
                                    {
                                        // TODO: add review rating and score components
                                    }
                                    {/* rating is the review's rating of the item, score is the vote tally of the review */}
                                </Accordion.Header>
                                <Accordion.Body>
                                    <Container className="ms-3">
                                        <ListGroup as="ul" variant="flush">
                                            {replies[review?.id as number].map((reply) => {
                                                return (
                                                    <ListGroup.Item>
                                                        <p className="text-wrap">
                                                            {reply.body}
                                                            <span className="text-secondary"> - {reply.username}</span>
                                                        </p>
                                                    </ListGroup.Item>
                                                )
                                            })}
                                        </ListGroup>
                                    </Container>
                                </Accordion.Body>
                            </Accordion.Item>
                        )
                    })}
                </Accordion>
            </Container>
        </Container>
    )
}