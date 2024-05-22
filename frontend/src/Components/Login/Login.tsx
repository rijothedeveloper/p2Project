import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserInterface } from "../../Interfaces/UserInterface"
import { UserContext } from "../../Contexts/UserContext";
import { login } from "../../FrontendAPI/api";
import { Button, FloatingLabel, Form, InputGroup } from "react-bootstrap";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useToast } from "../../Contexts/ToastContext";


export const Login: React.FC = () => {
      // TODO: On successful login, set the current user
  
    const navigate = useNavigate()

    const { setCurrentUser } = useContext(UserContext)
    const { addToast } = useToast();

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
          addToast(response, true, new Date());
          // alert(response);
        } else {
          addToast(`Welcome, ${response.username}`, false, new Date());
          // alert("Welcome!");
          console.log(`LOGIN RESPONSE`)
          console.log(JSON.stringify(response));
          setCurrentUser(response);
          navigate("/dashboard");
        }
        //navigate("/itemsbycategory")

    }

    return (
    <div>
      {/* Login Form */}
      <div className="container mt-3 w-75" style={{ backgroundColor: '#f8f9fa' }}>
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
    )
}