import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { BsHandThumbsDown, BsHandThumbsDownFill, BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";
import { UserContext } from "../../Contexts/UserContext";
import { ReviewInterface } from "../../Interfaces/ReviewInterface";
import { addScore, getUserScore } from "../../FrontendAPI/api";

export const ReactToReview: React.FC<ReviewInterface> = (review:ReviewInterface) => {

    const { currentUser } = useContext(UserContext);

    // TODO: get current logged in user vote signal for current review

    const [userVoteSignal, setUserVoteSignal] = useState<number>(0);
    const [votes, setVotes] = useState(0);

    const vote = addScore(currentUser?.jwt as string, review, userVoteSignal).then((response) => {
                if (response) {
                    console.log(response);
                } else {
                    console.error(response);
                }
            });
    const handleUpvote = () => {
        // handle changing user vote to neutral
        if (userVoteSignal > 0) {
            setVotes(votes - 1);
            setUserVoteSignal(0);
            return;
        }
        // Handle changing user vote from downvote to upvote
        if (userVoteSignal < 0) {
            setVotes(votes + 1);
        }
        setVotes(votes + 1);
        setUserVoteSignal(1);
        addScore(currentUser?.jwt as string, review, 1).then((response) => {
            if (response) {
                console.log(response);
            } else {
                console.error(response);
            }
        });

    };
    const handleDownvote = () => {
        // handle changing user vote to neutral
        if (userVoteSignal < 0) {
            setVotes(votes + 1);
            setUserVoteSignal(0);
            return;
        }
        // handle changing user vote from upvote to downvote
        if (userVoteSignal > 0) {
            setVotes(votes - 1);
        }
        setVotes(votes - 1);
        setUserVoteSignal(-1)
        if (userVoteSignal === 0) {
            addScore(currentUser?.jwt as string, review, -1).then((response) => {
                if (response) {
                    console.log(response);
                } else {
                    console.error(response);
                }
            });
        } else {}
            
    };

    useEffect(() => {
            getUserScore(currentUser?.jwt as string, review.id as number).then((response) => {
                setUserVoteSignal(response);
            });
        }, [currentUser, review.id]);

    
    
    

    return (
        <Container>
            <h2>Rate Review</h2>
            <Container className="d-flex">
                {userVoteSignal < 0 ? <BsHandThumbsUpFill className="text-success" onClick={handleUpvote}/> : <BsHandThumbsUp onClick={handleUpvote}/>}
                <p>{votes}</p>
                {userVoteSignal > 0 ? <BsHandThumbsDownFill className="text-danger" onClick={handleDownvote}/> : <BsHandThumbsDown onClick={handleDownvote}/>}
            </Container>
        </Container>
    )
}