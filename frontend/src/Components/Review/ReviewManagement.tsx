import { useContext, useEffect, useState } from "react"
import { Button, Container, Table } from "react-bootstrap"
import { ReviewInterface } from "../../Interfaces/ReviewInterface"
import { UserContext } from "../../Contexts/UserContext";
import { getAllReviews } from "../../FrontendAPI/api";
import { useNavigate } from "react-router-dom";

export const ReviewManagement: React.FC = () => {

    const { currentUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [reviews, setReviews] = useState<ReviewInterface[]>([]);

    const fetchReviews = async () => {
        const response = await getAllReviews(currentUser?.jwt as string);
        if (!response.status) {
            console.error(response.message);
            alert(response.message);
        } else {
            console.log(response.message);
            setReviews(response.data);
        }
    };

    useEffect(() => {
        if (currentUser) {
            fetchReviews();
        }
    }, [currentUser]);

    return (
        <Container>
            <Table striped hover>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Body</th>
                        <th>Username</th>
                        <th>Rating</th>
                        <th>Item</th>
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
                                <td>
                                    <Button variant="outline-info" onClick={() => navigate(`/item/${review.itemId}`)}>
                                        View Item
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