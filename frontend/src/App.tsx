import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './Components/Login/Login';
import { Register } from './Components/Register/Register';
import { UserDetails } from './Components/Users/UserDetails';
import { UserContext } from './Contexts/UserContext';
import { useState } from 'react';
import { UserInterface } from './Interfaces/UserInterface';
import { AllRevByUser } from './Components/Review/AllRevByUser';

function App() {

    const [currentUser, setCurrentUser] = useState<UserInterface|null>(null);

    return (
        <div className="App">
            <UserContext.Provider value={{currentUser, setCurrentUser}}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/user/:userId?" element={<UserDetails />} />
                        <Route path="/review/:userId" element={<AllRevByUser/>}/>
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </div>
    );
}

export default App;
