import { useContext, useState } from "react"
import { ItemInterface } from "../../Interfaces/ItemInterface"
import { FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import { addItem } from "../../FrontendAPI/api";
import { useToast } from "../../Contexts/ToastContext";

export const AddItem: React.FC = () => {

    const navigate = useNavigate()
    const { currentUser } = useContext(UserContext)
    const { addToast } = useToast();
    const[item, setItem] = useState<ItemInterface>({
        // Set the default values of the input fields
        name:"",
        category: "",
        description: "",
        image: "",
        producerId: 0
    })
    
    // Store the values of the input fields
    const storeValues = (input:any) => {
        setItem((item:ItemInterface) => ({
            ...item,
            [input.target.name]: input.target.value
        }))
    }
    
    const createItem = async () => {
        // Add item to the database
        const response = await addItem(currentUser?.jwt as string, item);
        if (!response.status) {
          addToast(response.message, true, new Date());
        } else {
          addToast(response.message, true, new Date());
        }
    };

    return (
        <div className="additem">

    {/* Add a new item form */}
      <div className="container" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Add a New Item</h2>

                <div className="mb-3">
                    <FloatingLabel label="Name">
                        <Form.Control type="text" id="floatingName" name="name" onChange={storeValues} placeholder="Name"/>
                    </FloatingLabel>
                    <FloatingLabel label="Category">
                        <Form.Control type="text" id="floatingCategory" name="category" onChange={storeValues} placeholder="Category"/>
                    </FloatingLabel>
                    <FloatingLabel label="Description">
                        <Form.Control type="text" id="floatingDescription" name="description" onChange={storeValues} placeholder="Description"/>
                    </FloatingLabel>
                    <FloatingLabel label="Image">
                        <Form.Control type="text" id="floatingImage" name="image" onChange={storeValues} placeholder="Image"/>
                    </FloatingLabel>
                    <FloatingLabel label="Producer ID">
                        <Form.Control type="number" id="floatingProducer_id" name="producerId" onChange={storeValues} placeholder="Producer ID"/>
                    </FloatingLabel>
                </div>

                <div className="d-flex flex-row ms-3">
                  <button className="btn btn-primary" onClick={createItem}>Add Item</button>
                  {/* Add a back button to navigate back to the home page or admin page*/}
                  {/* <button className="btn btn-secondary ms-2" onClick={() => navigate("/")} style={{ backgroundColor: '#343a40', borderColor: '#343a40' }}>back</button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}