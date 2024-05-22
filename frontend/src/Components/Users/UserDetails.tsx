import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { UserInterface } from "../../Interfaces/UserInterface";
import { get } from "http";
import { findUserByUsername, getUserReviews } from "../../FrontendAPI/api";
import { UserContext } from "../../Contexts/UserContext";
import { ReviewModal } from "../Review/ReviewModal";
import { ReviewInterface } from "../../Interfaces/ReviewInterface";
import { useToast } from "../../Contexts/ToastContext";

export const UserDetails: React.FC = () => {

    const { username } = useParams<{ username: string}>();
    const { currentUser } = useContext(UserContext);
    const nav = useNavigate();
    const { addToast } = useToast();

    const [user, setUser] = useState<UserInterface>({
        username: "",
        email: "",
        role: "",
        id: 0,
    });

    const [reviews, setReviews] = useState<ReviewInterface[]>([]);

    useEffect(() => {
        console.log(username);
        findUserByUsername(currentUser?.jwt as string, username as string).then((response) => {
            console.log("User found");
            setUser(() => ({...user, username: response.username, email: response.email, role: response.role, id: response.id}));
            if (response.id) {
                nav("/review/" + response.id.toString());
                getUserReviews(currentUser?.jwt as string, response.id as number).then((response) => {
                    if (Array.isArray(response)) {
                        setReviews(response);
                    }
                }).catch((error) => {console.log(error.message); addToast(error.message, true, new Date())});
            }
        }).catch((error) => {console.log(error.message); addToast(error.message, true, new Date())});
    }, []);

    return (

        <div>
            <div className="container" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h1 className="card-title">User Details</h1>
                        <div className="card-text">
                            <p>Username: {user.username}</p>
                            <p>Email: {user.email}</p>
                            <p>Role: {user.role}</p>
                            <p>Reviews:</p>
                            
                                {reviews.map((review) => {
                                    return <ReviewModal {...review} key={review.id}/>
                                })}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}