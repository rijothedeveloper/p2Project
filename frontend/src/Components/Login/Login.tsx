import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserInterface } from "../../Interfaces/UserInterface"
import axios from "axios"
import { useAuth } from "../../globalData/AuthContextType"
import { UserContext } from "../../Contexts/UserContext";
import { login } from "../../FrontendAPI/api";
import { Button, FloatingLabel, Form, InputGroup } from "react-bootstrap";
import { BsEye, BsEyeSlash } from "react-icons/bs";


export const Login: React.FC = () => {
      // TODO: On successful login, set the current user
  
    const navigate = useNavigate()
    const { setJwt } = useAuth()

    const { setCurrentUser } = useContext(UserContext)

    const[UserInterface, setUser] = useState<UserInterface>({
        username:"",
        password:"",
        jwt:""
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

  const navigate = useNavigate();

  const [UserInterface, setUser] = useState<UserInterface>({
    username: "",
    password: "",
    jwt: "",
  });

    const login_request = async () => {
        const response = await axios.post("http://localhost:8080/users/login", UserInterface)
        .then((response)=>{
            setJwt(response.data.jwt);
            console.log(response.data.jwt)

            // need to fix later to moving another page instead of alert
            alert("Welocome!")
            navigate("/allusers")
        }).catch((error)=>{
            if (error.response) {
                alert(error.response.data);
            } else {
                alert('Failed to login');
            }
        })
    }

  const login_request = async () => {
    /* uncomment when you  use response */
    // const response = await axios
    //   .post("http://localhost:8080/users/login", UserInterface)
    //   .then((respone) => {
    //     console.log(respone.data.jwt);
    //     // need to fix later to moving another page instead of alert
    //     alert("Welocome!");
    //     // navigate("/")
    //   })
    //   .catch((error) => {
    //     if (error.response) {
    //       alert(error.response.data);
    //     } else {
    //       alert("Failed to login");
    //     }
    //   });
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/">
            Logo
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/allusers">all users</a>
             </li>
              <li className="nav-item">
                <a className="nav-link" href="/">Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/register">
                  Register
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Login Form */}
      <div className="container py-5" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">
                  Login to your Account
                </h2>

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

                <div className="d-flex flex-row ms-3">
                  <button className="btn btn-primary" onClick={login_request}>Login</button>
                  <button className="btn btn-secondary ms-2" onClick={() => navigate("/register")} style={{ backgroundColor: '#343a40', borderColor: '#343a40' }}>Go to Register</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
