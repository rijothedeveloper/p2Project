import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserInterface } from "../../Interfaces/UserInterface"
import { UserContext } from "../../Contexts/UserContext";
import { login } from "../../FrontendAPI/api";
import { Button, FloatingLabel, Form, InputGroup } from "react-bootstrap";
import { BsEye, BsEyeSlash } from "react-icons/bs";


export const Login: React.FC = () => {
      // TODO: On successful login, set the current user
  
    const navigate = useNavigate()

    const { currentUser, setCurrentUser } = useContext(UserContext);

    const[UserInterface, setUser] = useState<UserInterface>({
        username:"",
        password:""
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

    const login_request = async () => {
        const response = await login(UserInterface);
        if (typeof response === "string") {
          alert(response);
        } else {
          alert("Welcome!");
          console.log(`LOGIN RESPONSE`)
          console.log(JSON.stringify(response));
          setCurrentUser(response);
        }
        navigate("/itemsbycategory")

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
         

      {/* Login Form */}
      <div className="container py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Login to your Account</h2>

                <div className="mb-3">
                  <FloatingLabel controlId="floatingUsername" label="Username">
                    <Form.Control type="text" name="username" onChange={storeValues} placeholder="JohnDoe"/>
                  </FloatingLabel>
                </div>

                <div className="mb-3">
                  <InputGroup>
                    <FloatingLabel controlId="floatingPassword" label="Password">
                      <Form.Control type={passwordIsVisible ? "text": "password"} name="password" onChange={storeValues} placeholder="Password" />
                    </FloatingLabel>
                    <Button onClick={togglePasswordVisibility} id="passwordVisibility">
                      {passwordIsVisible ? <BsEye className="fs-3"/> : <BsEyeSlash className="fs-3"/>}
                    </Button>
                  </InputGroup>
                </div>

                <div className="d-flex flex-row ms-3">
                  <button className="btn btn-primary" onClick={login_request}>Login</button>
                  <button className="btn btn-secondary ms-2" onClick={() => navigate("/register")}>Go to Register</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}