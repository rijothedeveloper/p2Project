import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserInterface } from "../../Interfaces/UserInterface";
import { getAllUsers } from '../../FrontendAPI/api';
import { UserContext } from '../../Contexts/UserContext';

export const AllUsers: React.FC = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext);
    const [users, setUsers] = useState<UserInterface[]>([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await getAllUsers(currentUser?.jwt as string);
        if (typeof response === "string") {
            console.error(response);
            setUsers([]);
        } else {
            console.log(response);
            setUsers(response);
        }
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
                                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/allusers">all users</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/">Login</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/register">Register</a>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
