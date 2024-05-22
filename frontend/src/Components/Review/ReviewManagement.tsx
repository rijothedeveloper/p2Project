import { useContext, useEffect, useState } from "react"
import { Button, Container, Table } from "react-bootstrap"
import { ReviewInterface } from "../../Interfaces/ReviewInterface"
import { UserContext } from "../../Contexts/UserContext";
import { deleteReviewByID, getAllReviews } from "../../FrontendAPI/api";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../Contexts/ToastContext";

export const ReviewManagement: React.FC = () => {

    const { currentUser } = useContext(UserContext);
    const { addToast } = useToast();
    const navigate = useNavigate();

    const [reviews, setReviews] = useState<ReviewInterface[]>([]);

    const fetchReviews = async () => {
        const response = await getAllReviews(currentUser?.jwt as string);
        if (!response.status) {
            console.error(response.message);
            // alert(response.message);
            addToast(response.message, true, new Date());
        } else {
            console.log(response.message);
            setReviews(response.data);
        }
    };
    const deleteReview = async (reviewId: number) => {
        const response = await deleteReviewByID(currentUser?.jwt as string, reviewId);
        if (!response.status) {
            console.error(response.message);
            // alert(response.message);
            addToast(response.message, true, new Date());
        } else {
            console.log(response.message);
            // alert(response.message);
            setReviews(reviews.filter(review => review.id !== reviewId));
            addToast(response.message, false, new Date());
        }
    };

    useEffect(() => {
        if (currentUser) {
            fetchReviews();
        }
    }, [currentUser]);

    return (
        <Container>
            <h1>Manage Reviews</h1>
            <Table className="align-middle" striped hover responsive>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Body</th>
                        <th>Username</th>
                        <th>Rating</th>
                        <th>Item</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody className='table-group-divider'>
                    {reviews.map((review, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{review.title}</td>
                                <td className="text-wrap">{review.body}</td>
                                <td>{review.username}</td>
                                <td>{review.rating}</td>
                                <td className="text-nowrap">
                                    <Button variant="outline-info" size="sm" onClick={() => navigate(`/item/${review.itemId}`)}>
                                        View Item
                                    </Button>
                                </td>
                                <td>
                                    <Button variant="outline-danger" size="sm" onClick={() => deleteReview(review.id as number)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </Container>
    )
}