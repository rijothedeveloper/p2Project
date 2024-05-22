import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { BsHandThumbsDown, BsHandThumbsDownFill, BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";
import { UserContext } from "../../Contexts/UserContext";
import { ReviewInterface } from "../../Interfaces/ReviewInterface";
import { deleteVote, getUserVote, newVote, updateVote } from "../../FrontendAPI/api";
import { useToast } from "../../Contexts/ToastContext";

export const ReactToReview: React.FC<ReviewInterface> = (review:ReviewInterface) => {

    const { currentUser } = useContext(UserContext);
    const { addToast } = useToast();
    const [userVoteSignal, setUserVoteSignal] = useState<number>(0);
    const [votes, setVotes] = useState<number>(review.score || 0);

    useEffect(() => {
        if (currentUser) {
            const fetchVote = async () => {
                if (currentUser?.jwt && review.id) {
                    const response = await getUserVote(currentUser.jwt, review.id);
                    if (!response.status) {
                        console.error(response.message);
                        // addToast(response.message, false, new Date());
                        //alert(response.message);
                    } else {
                        console.log(response.message);
                        // addToast(response.message, true, new Date());
                        setUserVoteSignal(response.data);
                    }
                }
            }
            fetchVote();
        }
    }, [currentUser, review.id]);

    const handleVote = async (newSignal: number) => {
        // reset vote to 0
        if (newSignal === userVoteSignal) {
            newSignal = 0;
        }

        // find vote difference
        const voteChange = newSignal - userVoteSignal
        setUserVoteSignal(newSignal);
        setVotes(votes + voteChange);

        let response;
        if (newSignal === 0) {
            response = await deleteVote(currentUser?.jwt as string, review.id as number);
        } else if (userVoteSignal === 0) {
            response = await newVote(currentUser?.jwt as string, review.id as number, newSignal);
        } else {
            response = await updateVote(currentUser?.jwt as string, review.id as number, newSignal);
        }

        if (!response.status) {
            console.error(response.message);
            addToast(response.message, true, new Date());
            //alert(response.message);
        } else {
            addToast(response.message, false, new Date());
            console.log(response.message);
        }
    };

    return (
        <Container>
            <h5>Rate Review</h5>
            <Container className="d-flex align-items-center">
                {userVoteSignal > 0 ?
                <BsHandThumbsUpFill className="text-success" onClick={()=> handleVote(1)}/> : <BsHandThumbsUp onClick={() => handleVote(1)}/>}
                <div className="align-self-center">{votes}</div>
                {userVoteSignal < 0 ? <BsHandThumbsDownFill className="text-danger" onClick={() => handleVote(-1)}/> : <BsHandThumbsDown onClick={() => handleVote(-1)}/>}
            </Container>
        </Container>
    )
}