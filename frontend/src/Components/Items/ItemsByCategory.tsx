import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { UserInterface } from "../../Interfaces/UserInterface"
import { UserContext } from "../../Contexts/UserContext";
import {useNavigate } from "react-router-dom";
import { ItemInterface } from "../../Interfaces/ItemInterface";
import { getAllItems, itemsByCategory } from "../../FrontendAPI/api";
import { Container, Form } from "react-bootstrap";


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
                alert("No item found in " + category + " category!");
            }
        };

        getItemsByCategory();
    }, [category, currentUser]);

 const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    
 };
    
 return (
    <>
        <Container id="profile-container">
            {/* Can add logged in user information here */}
        </Container>
        <Container id="select-view-container">
            <Form id="select-view-form">
                <Form.FloatingLabel label="" controlId="dashboard-select-view" onChange={handleCategoryChange}>
                    <Form.Select id="selectCategory" defaultValue="">
                        <option value="">Select a category</option>
                        <option value="health">HEALTH</option>
                        <option value="beauty">BEAUTY</option>
                        <option value="food">FOOD</option>
                        <option value="shoes">SHOES</option>
                        <option value="furniture">FURNITURE</option>
                    </Form.Select>
                </Form.FloatingLabel>
            </Form>
        </Container>
        <Container id="collection-review-container">
            {/* Render items based on category */}
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Image</th>
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
                                <td><img src={`/Category/shoes/${item.name}.png`} alt={item.name} className="img-fluid" style={{ maxWidth: '100px' }} /></td>
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
        </Container>
    </>
);
};
