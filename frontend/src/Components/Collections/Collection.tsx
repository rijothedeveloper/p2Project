import { useContext, useEffect, useState } from "react"
import { ItemInterface } from "../../Interfaces/ItemInterface"
import { ItemDetails } from "../Items/ItemDetails"
import { getCollection } from "../../FrontendAPI/api"
import { UserContext } from "../../Contexts/UserContext"

export const Collection:React.FC = () => {

    const { currentUser } = useContext(UserContext);

    const [myCollection, setCollection] = useState<ItemInterface[]>([])
    useEffect(() => {getMyCollection()},[]) 

    const getMyCollection = async () => {
        const response = await getCollection(currentUser?.jwt as string);
        setCollection(response);
    }

    return (
        <div>
            {myCollection.map((item:any) => {return <div className="my-collection">
                <ItemDetails {...item}  key={item.id}/>
            </div>})}
        </div>
    )
}