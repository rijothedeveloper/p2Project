import { useEffect, useState } from "react";
import { UserInterface } from "../Interfaces/UserInterface";
import { UserContext } from "./UserContext";

export const UserProvider: React.FC<any> = ({children}) => {
    const [currentUser, setCurrentUser] = useState<UserInterface|null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        } else {
            localStorage.removeItem('currentUser');
        }
    }, [currentUser]);

    return (
        <UserContext.Provider value={{currentUser, setCurrentUser}}>
            {children}
        </UserContext.Provider>
    );
}