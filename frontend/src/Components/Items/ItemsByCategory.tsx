import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "../../Contexts/UserContext";
import { ItemInterface } from "../../Interfaces/ItemInterface";
import { getItemsByCategory } from "../../FrontendAPI/api";

export const ItemsByCategory: React.FC <any>=(event: React.ChangeEvent<HTMLSelectElement>)=>{

    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [category, setCategory] = useState('');
    const [items, setItems] = useState<ItemInterface[]>([]);

    console.log(currentUser?.jwt)

    const fetchItems = async () => {
        const response = await getItemsByCategory(currentUser?.jwt as string, category);
        if (typeof response === "string") {
            console.error(response);
        } else {
            console.log(response);
            setItems(response);
        }
    };
    
    // Fetch items whenever the category changes
    useEffect(() => {
        fetchItems();
    }, [category, currentUser]);


    // Handle category change
    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    };
    
    return (
        <div>
            <select id="category" name="category" onChange={handleCategoryChange}>
                {/* Dropdown for selecting Category */}
                <option value="">Select a category</option>
                <option value="health">HEALTH</option>
                <option value="beauty">BEAUTY</option>
                <option value="food">FOOD</option>
                <option value="shoes">SHOES</option>
                <option value="furniture">FURNITURE</option>
            </select>
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>image</th>
                            <th>Item ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Rating</th>
                            <th>Category</th>
                            <th>Producer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td><img src={`/Category/shoes/${item.name}.png`} /> </td>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.rating}</td>
                                <td>{item.category}</td>
                                <td>{item.producer?.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}