import { useEffect, useState } from "react"
import { ItemInterface } from "../../Interfaces/ItemInterface"
import { ItemDetails } from "../Items/ItemDetails"
import axios from "axios"

export const Collection:React.FC = () => {


    const [myCollection, setCollection] = useState<ItemInterface[]>([])
    useEffect(() => {getCollection()},[]) 

    const getCollection = async () => {
        //will change to AWS RDS eventually
        await axios.get("http://localhost:8080/collections/my_collection", {withCredentials:true})
            .then((response)=>{setCollection(response.data)})
            .catch((error)=>{console.log(error)})
            //shouldn't encounter any errors, if user is not logged in it simply returns an empty list
    }

    return (
        <div>
            {myCollection.map((item:any) => {return <div className="my-collection">
                <ItemDetails {...item}  key={item.id}/>
            </div>})}
        </div>
    )
}