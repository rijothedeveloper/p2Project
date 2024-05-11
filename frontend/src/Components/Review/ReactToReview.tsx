import { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import { BsHandThumbsDown, BsHandThumbsDownFill, BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";
import { UserContext } from "../../Contexts/UserContext";

export const ReactToReview: React.FC = () => {

    const { currentUser } = useContext(UserContext);

    // TODO: get current logged in user vote signal for current review

    const [userVoteSignal, setUserVoteSignal] = useState<number>(0);
    const [votes, setVotes] = useState(0);

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
    };

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