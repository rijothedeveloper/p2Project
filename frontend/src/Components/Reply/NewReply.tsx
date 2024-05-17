import { useState } from "react"
import { ReplyInterface } from "../../Interfaces/ReplyInterface"
import { addReply } from "../../FrontendAPI/api"
import { ReviewInterface } from "../../Interfaces/ReviewInterface"

export const NewReply: React.FC<ReviewInterface> = (review:ReviewInterface) => {

    const [reply, setReply] = useState<ReplyInterface>({
        body: "",
        reviewId: review.id
    })
    
    //format a modal for making a new reply
    return (
        <div>
            <input type="text" value={reply.body} onChange={(e) => setReply({...reply, body: e.target.value})} />
            <button onChange={() => {addReply("TODO: Token", reply)}}>Submit</button>
        </div>
    )
}