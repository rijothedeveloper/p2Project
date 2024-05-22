import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './Components/Login/Login';
import { Register } from './Components/Register/Register';
import { UserDetails } from './Components/Users/UserDetails';
import { AllRevByUser } from './Components/Review/AllRevByUser';
import { Layout } from './Components/Layout/Layout';
import { AllUsers } from './Components/Users/AllUsers';
import { UserProvider } from './Contexts/UserProvider';
import { Dashboard } from './Components/Dashboard/Dashboard';
import { AddItem } from './Components/Items/AddItem';
import { AllItems } from './Components/Items/AllItems';
import { ItemDetails } from './Components/Items/ItemDetails';
import { ReviewManagement } from './Components/Review/ReviewManagement';
import { ToastProvider } from './Contexts/ToastProvider';

function App() {

    return (
        <UserProvider>
            <ToastProvider>
                <div className="App">
                    <BrowserRouter>
                        <Routes>
                            {/*for github pages deployment*/}
                            {/*<Route path="/p2project" element={<Login />} />*/}
                            <Route path="/" element={<Layout />}>
                                {/* Include all routes with a navbar below */}
                                <Route path="/" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="dashboard" element={< Dashboard />} />
                                <Route path="user/:username" element={<UserDetails />} />
                                <Route path="review/:userId" element={<AllRevByUser/>}/>
                                <Route path='item/:itemId' element={<ItemDetails/>} />
                                <Route path="allusers" element={<AllUsers />} />
                                <Route path="items" element={<AllItems/>} />
                                <Route path="additem" element={<AddItem />} />
                                <Route path="review-management" element={<ReviewManagement/>} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </div>
            </ToastProvider>
        </UserProvider>
    );
}

export default App;
