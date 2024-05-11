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
import { Dashboard } from './Components/Dashboard/Dashboard';

function App() {

    const [currentUser, setCurrentUser] = useState<UserInterface|null>(null);

    return (
        <div className="App">
            <UserContext.Provider value={{currentUser, setCurrentUser}}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route element={<Layout />}>
                            {/* Include all routes with a navbar below */}
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/user/:userId" element={<UserDetails />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </div>
    );
}

export default App;
