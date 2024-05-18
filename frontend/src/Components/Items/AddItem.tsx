import { useState } from "react"
import { ItemInterface } from "../../Interfaces/ItemInterface"
import { Button, FloatingLabel, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { wait } from "@testing-library/user-event/dist/utils";
import axios from "axios";

export const AddItem: React.FC = () => {

    const navigate = useNavigate()
    const[item, setItem] = useState<ItemInterface>({
        // Set the default values of the input fields
        name:"",
        category: "",
        description: "",
        image: "",
        producer_id: 0
    })
    
    // Store the values of the input fields
    const storeValues = (input:any) => {
        setItem((item:ItemInterface) => ({
            ...item,
            [input.target.name]: input.target.value
        }))
    }

    const addItem = async () => {
        // Add item to the database
        const resposne = await axios.post("http://localhost:8080/items", item)
        .then((response) => {      
            console.log(response.data)
            //navigate("/allitems")
        })
        .catch((error) => {
            alert("Failed to add the item")
        })
    }

    return (
        <div className="additem">
            <div>
                {/* Navigation Bar */}
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                        <a className="navbar-brand" href="/">Logo</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/allusers">all users</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

    {/* Add a new item form */}
      <div className="container py-5" style={{ backgroundColor: '#f8f9fa' }}>
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
                        <Form.Control type="number" id="floatingProducer_id" name="producer_id" onChange={storeValues} placeholder="Producer ID"/>
                    </FloatingLabel>
                </div>

                <div className="d-flex flex-row ms-3">
                  <button className="btn btn-primary" onClick={addItem}>Add</button>
                  {/* Add a back button to navigate back to the home page or admin page*/}
                  <button className="btn btn-secondary ms-2" onClick={() => navigate("/")} style={{ backgroundColor: '#343a40', borderColor: '#343a40' }}>back</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}