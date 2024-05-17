import { useState } from "react"
import { ReviewInterface } from "../../Interfaces/ReviewInterface"
import StarRating from "./StarRating"
import { ReplyInterface } from "../../Interfaces/ReplyInterface"
import { get } from "http"
import { addReply } from "../../FrontendAPI/api"
import { NewReply} from "../Reply/NewReply"

export const ReviewModal: React.FC<ReviewInterface> = (review:ReviewInterface) => {

    const [thisReview, setThisReview] = useState<ReviewInterface>(review)
    const [replies, setReplies] = useState<ReplyInterface[]>([])

    return (
        <div>
            {/**
             * If you are the owner of this review we include the Delete Review component.  We need to pass it the review ID at least and possibly a function to refresh
             * the view of wherever we were when the review was deleted.  Without that information the view displaying the review will still show and might confuse users.
             * Alternatively we could close the review modal when the delete button is pressed (we will be opening up a new modal) and then simply refresh the content.
             */}
        
            <div className="modal fade" id="reviewModal" tabIndex={-1} aria-labelledby="reviewModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="reviewModalLabel">{review.title}</h5>
                            <h6 className="modal-title">{review.username}</h6>
                            <span>{<StarRating {...thisReview}/>} </span>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>{review.body}</p>
                        </div>
                        <div className="modal-footer">
                            <span>{thisReview.score}</span>
                            <button type="button" className="btn btn-secondary" >View Replies</button>
                            {"TODO: user is owner or user is admin then show" && <button type="button" className="btn btn-danger">Delete</button>}
                            {"TODO: user is owner then show" && <button type="button" className="btn btn-primary">Edit</button>}
                            {"TODO: user is not ownder then show" && <NewReply {...thisReview}/>}
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    )
}