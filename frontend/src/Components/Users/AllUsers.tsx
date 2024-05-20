
import { UserContext } from "../../Contexts/UserContext"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserInterface } from "../../Interfaces/UserInterface";


export const AllUsers: React.FC = () => {
    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [users, setUsers] = useState<UserInterface[]>([]);
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const getAllUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8080/users/all", {
                headers: {
                    "Authorization": `Bearer ${currentUser?.jwt}` 
                }
            });
            console.log("API Response Data:", response.data);
            setUsers(response.data);
            const adminUser = response.data.find((user: UserInterface) => user.role === "ADMIN");
            setIsAdmin(adminUser ? true : false);
            setErrorMessage(null); 
        } catch (error) {
            console.error("Error fetching users", error);
            setErrorMessage("You are not an ADMIN");
        }
    };

    const handleLogout = () => {
        setCurrentUser(null);
        navigate("/login");
    };

    return (
        <div>
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
            </div>

            <div className="container py-5" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h2 className="card-title text-center mb-4">User List</h2>
                                <button className="btn btn-primary mb-3" onClick={getAllUsers}>
                                    Get All Users
                                </button>
                                {currentUser && (
                                    <div className="mb-3">
                                        <p>Username: {currentUser.username}</p>
                                        <p>Role: {currentUser.role}</p>
                                    </div>
                                )}
                                {isAdmin === false && <p className="text-danger">You are not an ADMIN</p>}
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>User ID</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Username</th>
                                            <th>Role</th>
                                            <th>Email</th>
                                            <th>Timestamp</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr key={user.id}>
                                                <td>{user.id}</td>
                                                <td>{user.firstName}</td>
                                                <td>{user.lastName}</td>
                                                <td>{user.username}</td>
                                                <td>{user.role}</td>
                                                <td>{user.email}</td>
                                                <td>{user.timestamp}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
