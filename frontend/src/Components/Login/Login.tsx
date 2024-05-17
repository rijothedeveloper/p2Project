import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserInterface } from "../../Interfaces/UserInterface";
import axios from "axios";

export const Login: React.FC = () => {
  // TODO: On successful login, set the current user

  const navigate = useNavigate();

  const [UserInterface, setUser] = useState<UserInterface>({
    username: "",
    password: "",
    jwt: "",
  });

  const storeValues = (input: any) => {
    setUser((UserInterface: UserInterface) => ({
      ...UserInterface,
      [input.target.name]: input.target.value,
    }));
  };

  // // other frontend pages need to use like this for using jwt
  // const response = await axios.post("http://localhost:8080/____", UserInterface, {
  //     headers: {
  //         "Authorization": "Bearer " + UserInterface.jwt
  //     }
  // })
  // .then()
  // //... your code

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
                <a className="nav-link" href="/">
                  Login
                </a>
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
                  <label htmlFor="username" className="form-label">
                    Username:
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={UserInterface.username}
                    onChange={storeValues}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={UserInterface.password}
                    onChange={storeValues}
                    className="form-control"
                  />
                </div>

                <div className="d-grid gap-2">
                  <button className="btn btn-primary" onClick={login_request}>
                    Login
                  </button>
                  <button
                    className="btn btn-secondary mt-2"
                    onClick={() => navigate("/register")}
                    style={{
                      backgroundColor: "#343a40",
                      borderColor: "#343a40",
                    }}
                  >
                    Go to Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
