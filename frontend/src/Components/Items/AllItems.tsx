import { useContext, useEffect, useState } from "react";
import { ItemInterface } from "../../Interfaces/ItemInterface";
import { Container } from "react-bootstrap";
import { UserContext } from "../../Contexts/UserContext";
import { getAllItems, getItemsByCategory } from "../../FrontendAPI/api";
import { ItemsByCategory } from "./ItemsByCategory";
import { ItemColumns } from "./ItemColumns";

export const AllItems: React.FC = () => {

    const { currentUser } = useContext(UserContext);

    const [category, setCategory] = useState('');
    const [categoryItems, setCategoryItems] = useState<ItemInterface[]>([]);
    const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
    const [items, setItems] = useState<ItemInterface[]>([]);

    // Fetch all items
    const fetchItems = async () => {
        const response = await getAllItems(currentUser?.jwt as string);
        if (!response.status) {
            console.error(response.message);
            setItems(response.data);
        } else {
            console.log(response.message);
            setItems(response.data);
        }
    };
    
    // Fetch items on currentUser load
    useEffect(() => {
        if (currentUser) {
            fetchItems();
        }
    }, [currentUser]);
    // Get list of categories when items are updated
    useEffect(() => {
        const categories = items.map((item) => {
            return item.category;
        });
        setCategoryOptions(Array.from(new Set(categories)));
    }, [items]);
    // Filter list of items for items with category
    useEffect(() => {
        const itemsWithCategory = items.filter((item) => {
            if (item.category === category) {
                return item;
            }
        });
        setCategoryItems(category === "" ? items : itemsWithCategory);
    }, [category]);

    return (
        <Container>
            <ItemsByCategory setCategory={setCategory} categoryOptions={categoryOptions} />
            <Container className="mt-3">
                <ItemColumns items={categoryItems} />
            </Container>
        </Container>
    )
}