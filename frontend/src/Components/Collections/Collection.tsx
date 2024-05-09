import { useState } from "react"
import { ItemInterface } from "../../Interfaces/ItemInterface"
import { ItemDetails } from "../Items/ItemDetails"

export const Collection:React.FC = () => {


    const [myCollection, setCollection] = useState<ItemInterface[]>([])


    return (
        <div>
            {myCollection.map((item:any) => {
                return <div className="my-collection">
                    <ItemDetails {...item}  key={item.id}/>

                    </div>})}
        
        </div>
    )
}