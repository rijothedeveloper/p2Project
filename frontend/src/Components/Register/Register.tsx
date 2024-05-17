import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { UserInterface } from '../../Interfaces/UserInterface'
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';

export const Register: React.FC = () => {

    const navigate = useNavigate()

    const[UserInterface, setUser] = useState<UserInterface>({
        firstName:"",
        lastName:"",
        username:"",
        password:"",
        email:""
    })

    const storeValues = (input: any) => {
        setUser((UserInterface:UserInterface ) => ({
            ...UserInterface,
            [input.target.name]: input.target.value
        }))
    }


    const signup_request = async () => {
        const response = await axios.post("http://localhost:8080/users/add", UserInterface)
        .then((respone)=>{
            navigate("/")
        }).catch((error)=>{
            if (error.response) {
                alert(error.response.data);
            } else {
                alert('Failed to sign up');
            }
        }) 
        
    }

    return (
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
                  <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/allusers">all users</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">Login</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/register">Register</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
  
        {/* Registration Form */}
        <div className="container py-5" style={{ backgroundColor: '#f8f9fa' }}>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h2 className="card-title text-center mb-4">Register your Account</h2>
  
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username:</label>
                    <input type="text" id="username" name="username" value={UserInterface.username} onChange={storeValues} className="form-control" />
                  </div>
  
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" id="password" name="password" value={UserInterface.password} onChange={storeValues} className="form-control" />
                  </div>
  
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name:</label>
                    <input type="text" id="firstName" name="firstName" value={UserInterface.firstName} onChange={storeValues} className="form-control" />
                  </div>
  
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name:</label>
                    <input type="text" id="lastName" name="lastName" value={UserInterface.lastName} onChange={storeValues} className="form-control" />
                  </div>
  
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="text" id="email" name="email" value={UserInterface.email} onChange={storeValues} className="form-control" />
                  </div>
  
                  <div className="d-grid gap-2">
                    <button className="btn btn-primary" onClick={signup_request}>Sign Up</button>
                    <button className="btn btn-secondary mt-2" onClick={() => navigate("/")} style={{ backgroundColor: '#343a40', borderColor: '#343a40' }}>Go Back to Login</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}