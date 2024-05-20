import { useContext, useEffect, useState } from "react";
import { ItemInterface } from "../../Interfaces/ItemInterface";
import { Container, Form } from "react-bootstrap";
import { UserContext } from "../../Contexts/UserContext";
import { getAllItems, getItemsByCategory } from "../../FrontendAPI/api";
import { ItemsByCategory } from "./ItemsByCategory";
import { ItemColumns } from "./ItemColumns";
import { ItemsByName } from "./ItemsByName";

export const AllItems: React.FC = () => {

    const { currentUser } = useContext(UserContext);

    const [category, setCategory] = useState('');
    const [categoryItems, setCategoryItems] = useState<ItemInterface[]>([]);
    const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
    const [nameFilter, setNameFilter] = useState<string>("");
    const [nameItems, setNameItems] = useState<ItemInterface[]>([]);
    const [items, setItems] = useState<ItemInterface[]>([]);
    const [view, setView] = useState<string>("category");

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
    // Handle switch change
    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === view){
            setView(view === "category" ? "name": "category");
        } else {
            setView(event.target.value);
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
        const itemsWithCategory = items.filter(item => item.category === category);
        setCategoryItems(category === "" ? items : itemsWithCategory);
    }, [category]);
    // Filter list of items for items with name
    useEffect(() => {
        const itemsWithName = items.filter(item => item.name.toLowerCase().indexOf(nameFilter.toLowerCase()) > -1);
        setNameItems(itemsWithName);
    }, [nameFilter])

    return (
        <Container>
            <Container id="categorySwitch" className="ms-3">
                <Form.Switch inline id="categoryFilter" name="selectView" label="Filter by Category" value="category" checked={view === "category"} onChange={handleSwitchChange} />
            </Container>
            <ItemsByCategory setCategory={setCategory} categoryOptions={categoryOptions} />
            <Container id="nameSwitch" className="mt-3 ms-3">
                <Form.Switch inline id="nameFilter" name="selectView" label="Filter by Name" value="name" checked={view === "name"} onChange={handleSwitchChange} />
            </Container>
            <ItemsByName setNameFilter={setNameFilter} />
            <Container id="itemGrid" className="mt-3">
                <ItemColumns items={view === "category" ? categoryItems : nameItems} />
            </Container>
        </Container>
    )
}