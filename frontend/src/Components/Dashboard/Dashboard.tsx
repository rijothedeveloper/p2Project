import { useContext, useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap"
import { UserContext } from "../../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import ReviewList from "./ReviewList";
import CollectionList from "./CollectionList";
import { Login } from "../Login/Login";

export const Dashboard: React.FC = () => {

    // TODO: Create the actual dashboard. This is skeleton code for the dashboard component. It should display the current users collection of items, reviews and maybe their information.

    // Navigation to navigate to different pages
    const navigate = useNavigate();
    
    // Get currentUser from user context
    const { currentUser } = useContext(UserContext);

    // Current view state - defaults to myCollection
    const [currentView, setCurrentView] = useState("myCollection");
    // My collection state - defaults to an empty array
    const [myCollection, setMyCollection] = useState([]);
    // My reviews state - defaults to an empty array
    const [myReviews, setMyReviews] = useState([]);

    /**
     * Handles the select view on change to change the current view in the dashboard
     * @param input - select input value
     */
    const handleSelectViewOnChange = (input: React.ChangeEvent<HTMLSelectElement>) => {
        const view: string = input.target.value;
        switch (view) {
            case "myCollection":
                // TODO: add function to get collection items for logged in users
                setCurrentView("myCollection");
                break;
            case "myReviews":
                // TODO: add function to get review items for logged in users
                setCurrentView("myReviews");
                break;
            default:
                // This should never run, but just in case
                alert("Invalid view type!");
                break;
        }
    };


    return currentUser 
    ?  (
        <>
            <Container id="profile-container">
                {/* Can add logged in user information here */}
            </Container>
            <Container id="select-view-container">
                <Form id="select-view-form">
                    <Form.FloatingLabel label="Select View" controlId="dashboard-select-view" onChange={handleSelectViewOnChange}>
                        <Form.Select id="selectMyView" defaultValue="myCollection">
                            <option value="myCollection">My Collection</option>
                            <option value="myReviews">My Reviews</option>
                        </Form.Select>
                    </Form.FloatingLabel>
                </Form>
            </Container>
            <Container id="collection-review-container">
                {/* Conditionally render my collection or my reviews based on currentView */}
                { currentView === "myCollection"
                ? (<CollectionList />)
                : <ReviewList />
                }
            </Container>
        </>
    )
    : <Login />
}