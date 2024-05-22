import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { UserInterface } from '../../Interfaces/UserInterface'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, FloatingLabel, Form, InputGroup } from "react-bootstrap"
import { register } from "../../FrontendAPI/api";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useToast } from "../../Contexts/ToastContext";


export const Register: React.FC = () => {

    const navigate = useNavigate()
    const { addToast } = useToast();

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
          // alert(response);
          addToast(response, true, new Date());
        } else {
          addToast("Successfully registered!", false, new Date());
          navigate("/");
        }
    }

    return (
        <div>  
        {/* Registration Form */}
        <div className="container mt-3 w-75" style={{ backgroundColor: '#f8f9fa' }}>
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
    )
}