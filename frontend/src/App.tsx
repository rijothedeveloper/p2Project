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
import { ItemsByCategory } from './Components/Items/ItemsByCategory';
import { Dashboard } from './Components/Dashboard/Dashboard';
import { AddItem } from './Components/Items/AddItem';

function App() {

    return (
        <UserProvider>
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
                            <Route path="user/:userId" element={<UserDetails />} />
                            <Route path="review/:userId" element={<AllRevByUser/>}/>
                            <Route path='item/:itemId' />
                            <Route path="allusers" element={<AllUsers />} />
                            <Route path="additem" element={<AddItem />} />
                            <Route path="itemsbycategory" element={<ItemsByCategory />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </UserProvider>
    );
}

export default App;
