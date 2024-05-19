import { useState } from "react"
import { ReviewModal } from "../Review/ReviewModal";

export const FileToTestReviewModal: React.FC = () => {

    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    const openModal = () => {
        setIsReviewModalOpen(true)
    }

    const closeModal = () => {
        setIsReviewModalOpen(false)
    }
    const itemId = 2;
    return(
        <div>
            <button onClick={openModal} >Open Modal</button>
            <ReviewModal isOpen={isReviewModalOpen} onClose={closeModal} itemIdToPass={itemId}/>
        </div>
    )


}