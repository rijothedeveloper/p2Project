import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { UserInterface } from '../../Interfaces/UserInterface'
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, FloatingLabel, Form, InputGroup } from "react-bootstrap"
import { register } from "../../FrontendAPI/api";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { UserContext } from "../../Contexts/UserContext";


export const Register: React.FC = () => {

    const navigate = useNavigate()

    const { currentUser, setCurrentUser } = useContext(UserContext);
    const[UserInterface, setUser] = useState<UserInterface>({
        firstName:"",
        lastName:"",
        username:"",
        password:"",
        email:""
    })
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);

    const storeValues = (input: any) => {
        setUser((UserInterface:UserInterface ) => ({
            ...UserInterface,
            [input.target.name]: input.target.value
        }))
    }
    const togglePasswordVisibility: React.MouseEventHandler<HTMLButtonElement> = () => {
      setPasswordIsVisible(!passwordIsVisible);
    }


    const signup_request = async () => {
        const response = await register(UserInterface);
        if (typeof response === 'string') {
          alert(response);
        } else {
          navigate("/login")
        }
    }

    const handleLogout = () => {
      setCurrentUser(null);
      navigate("/login");
  };


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
                                    <a className="nav-link" href="/allusers">All Users</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/">Login</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/register">Register</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/" onClick={handleLogout}>Logout</a>
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
                    <FloatingLabel controlId="floatingUsername" label="Username">
                      <Form.Control type="text" id="floatingUsername" name="username" onChange={storeValues} placeholder="JohnDoe"/>
                    </FloatingLabel>
                  </div>
  
                  <div className="mb-3">
                    <InputGroup>
                      <FloatingLabel controlId="floatingPassword" label="Password">
                        <Form.Control type={passwordIsVisible ? "text": "password"} id="floatingPassword" name="password" onChange={storeValues} placeholder="Password" />
                      </FloatingLabel>
                      <Button onClick={togglePasswordVisibility} id="passwordVisibility">
                        {passwordIsVisible ? <BsEye className="fs-3"/> : <BsEyeSlash className="fs-3"/>}
                      </Button>
                    </InputGroup>
                  </div>
  
                  <div className="mb-3">
                    <FloatingLabel controlId="floatingFirstname" label="First Name">
                      <Form.Control type="text" id="floatingFirstname" name="firstName" onChange={storeValues} placeholder="First Name"/>
                    </FloatingLabel>
                  </div>
  
                  <div className="mb-3">
                    <FloatingLabel controlId="floatingLastname" label="Last Name">
                      <Form.Control type="text" id="floatingLastname" name="lastName" onChange={storeValues} placeholder="Last Name"/>
                    </FloatingLabel>
                  </div>
  
                  <div className="mb-3">
                    <FloatingLabel controlId="floatingEmail" label="Email">
                      <Form.Control type="email" id="floatingEmail" name="email" onChange={storeValues} placeholder="Email"/>
                    </FloatingLabel>
                  </div>
  
                  <div className="d-flex flex-row ms-3">
                    <button className="btn btn-primary py-2" onClick={signup_request}>Sign Up</button>
                    <button className="btn btn-secondary py-2 ms-2" onClick={() => navigate("/")} style={{ backgroundColor: '#343a40', borderColor: '#343a40' }}>Go Back to Login</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}