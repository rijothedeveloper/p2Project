import { useContext, useEffect, useState } from "react";
import { ItemInterface } from "../../Interfaces/ItemInterface";
import { Container, Form } from "react-bootstrap";
import { UserContext } from "../../Contexts/UserContext";
import { getAllItems } from "../../FrontendAPI/api";
import { ItemsByCategory } from "./ItemsByCategory";
import { ItemColumns } from "./ItemColumns";
import { ObjectsByName } from "../GeneralUse/ObjectsByName";
import { useToast } from "../../Contexts/ToastContext";

export const AllItems: React.FC = () => {

    const { currentUser } = useContext(UserContext);
    const { addToast } = useToast();

    const [category, setCategory] = useState("");
    // const [categoryItems, setCategoryItems] = useState<ItemInterface[]>([]);
    const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
    const [nameFilter, setNameFilter] = useState<string>("");
    // const [nameItems, setNameItems] = useState<ItemInterface[]>([]);
    const [items, setItems] = useState<ItemInterface[]>([]);
    const [view, setView] = useState<string>("category");
    const [displayedItems, setDisplayedItems] = useState<ItemInterface[]>([]);

    // Fetch all items
    const fetchItems = async () => {
        const response = await getAllItems(currentUser?.jwt as string);
        if (!response.status) {
            addToast(response.message, true, new Date());
            console.error(response.message);
        } else {
            console.log(response.message);
            setItems(response.data);
            addToast(response.message, false, new Date());
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
    /*
    // Filter list of items for items with category
    useEffect(() => {
        const itemsWithCategory = items.filter(item => item.category === category);
        setCategoryItems(category === "" ? items : itemsWithCategory);
    }, [category]);
    // Filter list of items for items with name
    useEffect(() => {
        const itemsWithName = items.filter(item => item.name.toLowerCase().indexOf(nameFilter.toLowerCase()) > -1);
        setNameItems(itemsWithName);
    }, [nameFilter]);
    */
    // Get items to display in ItemColumns
    useEffect(() => {
        switch (view) {
            case "category":
                if (category === "") {
                    setDisplayedItems(items);
                } else {
                    setDisplayedItems(items.filter(item => item.category === category));
                }
                break;
            case "name":
                if (nameFilter === "") {
                    setDisplayedItems(items);
                } else {
                    setDisplayedItems(items.filter(item => item.name.toLowerCase().indexOf(nameFilter.toLowerCase()) > -1));
                }
                break;
            default:
                setDisplayedItems(items);
                break;
        }
    }, [view, category, nameFilter, items]);

    return (
        <Container>
            <Container id="categorySwitch" className="ms-3">
                <Form.Switch inline id="categoryFilter" name="selectView" label="Filter by Category" value="category" checked={view === "category"} onChange={handleSwitchChange} />
            </Container>
            <ItemsByCategory setCategory={setCategory} categoryOptions={categoryOptions} />
            <Container id="nameSwitch" className="mt-3 ms-3">
                <Form.Switch inline id="nameFilter" name="selectView" label="Filter by Name" value="name" checked={view === "name"} onChange={handleSwitchChange} />
            </Container>
            <ObjectsByName setNameFilter={setNameFilter} label="Filter by Name" />
            <Container id="itemGrid" className="mt-3">
                <ItemColumns items={displayedItems} />
            </Container>
        </Container>
    )
}