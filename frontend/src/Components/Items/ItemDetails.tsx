import { useState } from "react"
import { ItemInterface } from "../../Interfaces/ItemInterface"

export const ItemDetails: React.FC<ItemInterface> = (item:ItemInterface) => {

    const[itemState, setItem] = useState<ItemInterface>(item)

    return (
        <div>
            
        </div>
    )
}