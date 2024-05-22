import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserInterface } from "../../Interfaces/UserInterface";
import { getAllUsers, suspendUserByUsername } from '../../FrontendAPI/api';
import { UserContext } from '../../Contexts/UserContext';
import { Button, Table } from 'react-bootstrap';
import { ObjectsByName } from '../GeneralUse/ObjectsByName';
import { useToast } from '../../Contexts/ToastContext';

export const AllUsers: React.FC = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext);
    const { addToast } = useToast();
    const [users, setUsers] = useState<UserInterface[]>([]);
    const [nameFilter, setNameFilter] = useState<string>("");
    const [filteredUsers, setFilteredUsers] = useState<UserInterface[]>([]);

    // Get all users
    useEffect(() => {
        if (currentUser) {
            getUsers();
        }
    }, [currentUser]);
    // Filter users by username
    useEffect(() => {
        if (nameFilter !== "") {
            setFilteredUsers(users.filter(user => {
                const username = user.username as string;
                return username.toLowerCase().indexOf(nameFilter.toLowerCase()) > -1;
            }));
        } else {
            setFilteredUsers(users);
        }
    }, [nameFilter, users]);

    const getUsers = async () => {
        const response = await getAllUsers(currentUser?.jwt as string);
        if (typeof response === "string") {
            console.error(response);
            addToast(response, true, new Date());
        } else {
            console.log(response);
            setUsers(response);
        }
    };
    const suspendUser = async (username: string) => {
        const response = await suspendUserByUsername(currentUser?.jwt as string, username);
        if (!response.status) {
            console.error(response.message);
            // alert(response.message);
            addToast(response.message, true, new Date());
        } else {
            console.log(response.message);
            // alert(response.message);
            getUsers();
            addToast(response.message, false, new Date());
        }
    }

    return (
        <div>
            <div className="container" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title text-center mb-4">User List</h2>
                        <ObjectsByName setNameFilter={setNameFilter} label="Filter by Username" />
                        <Table className="mt-3" striped hover responsive>
                            <thead>
                                <tr>
                                    <th>User ID</th>
                                    <th>Suspend</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Username</th>
                                    <th>Role</th>
                                    <th>Email</th>
                                    <th>Timestamp</th>
                                </tr>
                            </thead>
                            <tbody className='table-group-divider'>
                                {filteredUsers.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>
                                            {user.role !== "SUSPEND" ?
                                            <Button variant="outline-danger" onClick={() => suspendUser(user.username as string)}>
                                                Suspend
                                            </Button> :
                                            <Button variant="outline-danger" disabled>
                                                Suspend
                                            </Button>}
                                        </td>
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
