import axios from "axios"
import { useState } from "react"
import { Reply } from "../Replies/Reply"

export const ReviewModal: React.FC = () => {

    const [replyCollection, setReplyCollection] = useState([])

    //When the review loads then we need to fetch all replies for the current review.  Then we can properly map the replies to the reply component.
    const fetchReplies = async () => {
        //we request the list of replies for the current review at the specified endpoint
        const response = axios.get("HTMLADDRESSNEEDSFIXING", {withCredentials:true})
        .then((response) => {setReplyCollection(response.data)})
    }

    return (
        <div>
            {/**
             * If you are the owner of this review we include the Delete Review component.  We need to pass it the review ID at least and possibly a function to refresh
             * the view of wherever we were when the review was deleted.  Without that information the view displaying the review will still show and might confuse users.
             * Alternatively we could close the review modal when the delete button is pressed (we will be opening up a new modal) and then simply refresh the content.
             */}
             {replyCollection.map((reply:any) => {return(<Reply {...reply} key={reply.replyID}/>)})}
        </div>
    )
}