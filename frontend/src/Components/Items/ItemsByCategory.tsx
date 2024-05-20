import React, { useContext } from "react"
import { UserContext } from "../../Contexts/UserContext";
import {useNavigate } from "react-router-dom";
import { ItemInterface } from "../../Interfaces/ItemInterface";
import { FloatingLabel,Container, Form } from "react-bootstrap";
import { capitalize } from "../../Utils/StringUtils";


export const ItemsByCategory: React.FC<{
    setCategory: React.Dispatch<React.SetStateAction<string>>,
    categoryOptions: string[]
}> = ({
    setCategory,
    categoryOptions
}) => {

    // The below functions were moved to AllItems component
    /*const [category, setCategory] = useState('');
    const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
    const [items, setItems] = useState<ItemInterface[]>([]);*/

    /*const fetchItems = async () => {
        const response = await getItemsByCategory(currentUser?.jwt as string, category);
        if (typeof response === "string") {
            console.error(response);
        } else {
            console.log(response);
            setItems(response);
        }
    };*/

    // Fetch items whenever the category changes
    /*useEffect(() => {
        fetchItems();
    }, [category, currentUser]);*/

    // Get list of categories when items are updated
    /*useEffect(() => {
        const categories = items.map((item) => {
            return item.category;
        });
        setCategoryOptions(Array.from(new Set(categories)));
    }, [items])*/

    // Handle category change
    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    };
    
    return (
        <Container className="mt-1">
            <FloatingLabel controlId="selectCategory" label="Category">
                <Form.Select name="category" defaultValue="" onChange={handleCategoryChange}>
                    {/* Dropdown for selecting Category */}
                    <option value="">Select a Category</option>
                    {categoryOptions.map((category, idx) => {
                        return (
                            <option key={idx} value={category}>{capitalize(category)}</option>
                        )
                    })}
                </Form.Select>
            </FloatingLabel>
            {/* Swapped out a table of items for a gird of items placed in ItemColumns component
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
            </div>*/}
        </Container>
    );
}
