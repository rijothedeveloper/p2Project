import { useContext, useEffect, useState } from "react"
import { Reply } from "../Replies/Reply"
import { getAllRepliesByReview } from "../../FrontendAPI/api"
import { UserContext } from "../../Contexts/UserContext"
import { ReviewInterface } from "../../Interfaces/ReviewInterface"
import StarRating from "./StarRating"
import { ReplyInterface } from "../../Interfaces/ReplyInterface"
import { NewReply} from "../Reply/NewReply"
import { ReactToReview } from "./ReactToReview"
import { DeleteReview } from "./DeleteReview"
import { useToast } from "../../Contexts/ToastContext"

export const ReviewModal: React.FC<ReviewInterface> = (review:ReviewInterface) => {

    // Moved to top to load currentUser ASAP - NEIL
    const { currentUser } = useContext(UserContext)
    const { addToast } = useToast();

    const [thisReview, setThisReview] = useState<ReviewInterface>(review)
    const [replies, setReplies] = useState<ReplyInterface[]>([])

    //When the review loads then we need to fetch all replies for the current review.  Then we can properly map the replies to the reply component.
    const fetchReplies = async () => {
        const response = await getAllRepliesByReview(currentUser?.jwt as string,review.id as number);
        if (!response.status) {
            console.error(response.message);
            // alert(response.message);
            addToast(response.message, true, new Date());
        } else {
            console.log(response.message);
            setReplies(response.data);
        }
    }

    useEffect(() => {
        /* Abstracted this into the above fetchReplies function - NEIL
        const result = fetchReplies(currentUser?.jwt as string,review.id as number)
        .then((result) => {setReplies(result as ReplyInterface[])})  //Need to convert result into an array of replies.*/
        if (currentUser) {
            fetchReplies();
        }
    }, [currentUser])

    const handleStarRatingChange = (rating: number) => {
        console.log(rating)
    }

   return (
            <div className="modal fade" id="reviewModal" tabIndex={-1} aria-labelledby="reviewModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="reviewModalLabel">{review.title}</h5>
                            <h6 className="modal-title">{review.username}</h6>
                            <span>{<StarRating 
                                review={thisReview}
                                handleRatingChange={handleStarRatingChange}
                                />} </span>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>{review.body}</p>
                          <h3>Replies</h3>
                          {replies.map((reply:any) => {return(<Reply {...reply} key={reply.replyID}/>)})}
                        </div>
                        <div className="modal-footer">
                            <span>{<ReactToReview/>}{thisReview.score}</span>
                            <button type="button" className="btn btn-secondary" >View Replies</button>
                            {/* {review.userId == currentUser?.id as number  || currentUser?.role == "ADMIN"? <DeleteReview {...review}/>:""} */}
                            {review.userId == currentUser?.id as number && <button type="button" className="btn btn-primary">Edit</button>}
                            {review.userId != currentUser?.id as number && <NewReply {...thisReview}/>}
                        </div>
                    </div>
                </div> 
            </div>
   )
}