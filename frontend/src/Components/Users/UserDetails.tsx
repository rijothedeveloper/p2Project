import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { UserInterface } from "../../Interfaces/UserInterface";
import { get } from "http";
import { findUserByUsername, getUserReviews } from "../../FrontendAPI/api";
import { UserContext } from "../../Contexts/UserContext";
import { ReviewModal } from "../Review/ReviewModal";
import { ReviewInterface } from "../../Interfaces/ReviewInterface";

export const UserDetails: React.FC = () => {

    const { username } = useParams<{ username: string}>();
    const { currentUser } = useContext(UserContext);

    const [user, setUser] = useState<UserInterface>({
        username: "",
        email: "",
        role: "",
        id: 0,
        // TODO: this should be set to default user properties
    });

    const [reviews, setReviews] = useState<ReviewInterface[]>([]);

    useEffect(() => {
        console.log(username);
        findUserByUsername(currentUser?.jwt as string, username as string).then((response) => {
            console.log("User found");
            setUser(() => ({...user, username: response.username, email: response.email, role: response.role, id: response.id}));
                console.log(user.id);
                getUserReviews(currentUser?.jwt as string, user.id as number).then((response) => {
                    if (Array.isArray(response)) {
                        setReviews(response);
                    }
                }).catch((error) => {console.log(error.message)});
        }).catch((error) => {console.log(error.message)});
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