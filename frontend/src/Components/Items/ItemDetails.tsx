import { useContext, useEffect, useState } from "react"
import { ItemInterface } from "../../Interfaces/ItemInterface"
import { getItemById } from "../../FrontendAPI/api"
import { UserContext } from "../../Contexts/UserContext"
import { useParams } from "react-router-dom"

export const ItemDetails: React.FC = () => {

    const [item, setItem] = useState<ItemInterface>()
    const { currentUser } = useContext(UserContext)
    let { itemId } = useParams<{ itemId: string }>();
    let itemIdNumber = Number(itemId);
    
    useEffect(() => {
        // fetch item by id
        getItemById(currentUser?.jwt as string, itemIdNumber).then((item) => {
        setItem(item as unknown as ItemInterface)})

    },[currentUser?.jwt, itemIdNumber]) 

    return (
        <div>
            <div className="modal fade" id="itemModal" tabIndex={-1} aria-labelledby="itemModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="itemModalLabel">{item?.name}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>{item?.description}</p>
                            <p>{item?.rating}</p>
                            <p>{item?.category}</p>
                            <p>{item?.producerId}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" >Review</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}