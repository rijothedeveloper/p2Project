import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { UserInterface } from "../../Interfaces/UserInterface"
import { UserContext } from "../../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { ItemInterface } from "../../Interfaces/ItemInterface";
import { getAllItems, itemsByCategory } from "../../FrontendAPI/api";


 export const ItemsByCategory: React.FC <any>=(event: React.ChangeEvent<HTMLSelectElement>)=>{

     const { currentUser, setCurrentUser } = useContext(UserContext);
     const [category, setCategory] = useState('');
     const [items, setItems] = useState<ItemInterface[]>([]);

    useEffect(() => {
        const getItemsByCategory = async () => {
            try {
                if (currentUser?.jwt) {
                    if (category == ""){
                        const data = await getAllItems(currentUser?.jwt);
                        setItems(data);
                    }else{
                        const data = await itemsByCategory(currentUser.jwt, category);
                        setItems(data);           
                    }   
                }
            } catch (error) {
                alert(error);
            }
        };

        getItemsByCategory();
    }, [category, currentUser]);

 const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (category !== "Select a category"){
        setCategory(event.target.value);
    }
    
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