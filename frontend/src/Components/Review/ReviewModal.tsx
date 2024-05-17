import React, { useContext, useState } from "react";
import { ReviewInterface } from "../../Interfaces/ReviewInterface";
import axios from "axios";
import { UserContext } from "../../Contexts/UserContext";


interface ReviewModalProps {
    isOpen: boolean
    onClose: () => void
    children?: React.ReactNode
}

export const ReviewModal: React.FC<ReviewModalProps> = ({isOpen, onClose, children}) => {
    const [review, setReview] = useState<ReviewInterface>({
        title: "",
        body: "",
        itemId: 1,
        rating: 0
    })
    const {currentUser} = useContext(UserContext)
    
    if(!isOpen) return null;

    

    const submitReview = async () => {
        
        try{
            await axios.post(`http://localhost:8080/reviews/${review.itemId}` , review, {
                headers: {
                    'Authorization':`Bearer ${currentUser?.jwt}`
                },
        })
        }catch(error){
            console.error("Failed to create review")
        }
    }

    const storeValues = (input: any) => {
        const {name,value} = input.target;
        setReview((prev) => ({...prev, [name]: name === "rating" ? parseInt(value) : value }))
    }

    return (
        <div>
            {/**
             * If you are the owner of this review we include the Delete Review component.  We need to pass it the review ID at least and possibly a function to refresh
             * the view of wherever we were when the review was deleted.  Without that information the view displaying the review will still show and might confuse users.
             * Alternatively we could close the review modal when the delete button is pressed (we will be opening up a new modal) and then simply refresh the content.
             */}

             <input type="text" placeholder="Title" name="title" onChange={storeValues}/>
             <input type="text" placeholder="body" name="body" onChange={storeValues}/>
             <input type="text" placeholder="rating" name="rating" onChange={storeValues}/>
             <button onClick={submitReview}>Create</button>
             <button onClick={onClose}>Close</button>
        </div>
    )
}