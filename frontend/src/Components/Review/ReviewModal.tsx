import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Reply } from "../Replies/Reply"
import { getAllRepliesByReview } from "../../FrontendAPI/api"
import { UserContext } from "../../Contexts/UserContext"

export const ReviewModal: React.FC = () => {

    const [replyCollection, setReplyCollection] = useState([])

    //When the review loads then we need to fetch all replies for the current review.  Then we can properly map the replies to the reply component.
    const fetchReplies = getAllRepliesByReview
    const { currentUser } = useContext(UserContext)

    useEffect(() => {
        fetchReplies(currentUser?.jwt as string,4)//Review ID needed
    }, [])

    return (
        <div>
            
             {replyCollection.map((reply:any) => {return(<Reply {...reply} key={reply.replyID}/>)})}
        </div>
    )
}