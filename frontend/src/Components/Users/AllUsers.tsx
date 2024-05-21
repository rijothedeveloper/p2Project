import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserInterface } from "../../Interfaces/UserInterface";
import { getAllUsers } from '../../FrontendAPI/api';
import { UserContext } from '../../Contexts/UserContext';
import { Table } from 'react-bootstrap';
import { ObjectsByName } from '../GeneralUse/ObjectsByName';

export const AllUsers: React.FC = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext);
    const [users, setUsers] = useState<UserInterface[]>([]);
    const [nameFilter, setNameFilter] = useState<string>("");

    useEffect(() => {
        if (currentUser) {
            getUsers();
        }
    }, [currentUser]);

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
            <div className="container" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title text-center mb-4">User List</h2>
                        <ObjectsByName setNameFilter={setNameFilter} />
                        <Table className="mt-3" striped hover responsive>
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
                            <tbody className='table-group-divider'>
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
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
};
