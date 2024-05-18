import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './Components/Login/Login';
import { Register } from './Components/Register/Register';
import { UserDetails } from './Components/Users/UserDetails';
import { UserContext } from './Contexts/UserContext';
import { useState } from 'react';
import { UserInterface } from './Interfaces/UserInterface';
import { Layout } from './Components/Layout/Layout';
import { AllUsers } from './Components/Users/AllUsers';
import { UserProvider } from './Contexts/UserProvider';
import { Dashboard } from './Components/Dashboard/Dashboard';

function App() {

    const [currentUser, setCurrentUser] = useState<UserInterface|null>(null);

    return (
        <UserProvider>
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        //for fithub pages deployment
                        <Route path="/p2project" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/allusers" element={<AllUsers />} />
                        <Route path="/" element={<Layout />}>
                            {/* Include all routes with a navbar below */}
                            <Route path="dashboard" element={< Dashboard />} />
                            <Route path="user/:userId" element={<UserDetails />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </UserProvider>
    );
}

export default App;
