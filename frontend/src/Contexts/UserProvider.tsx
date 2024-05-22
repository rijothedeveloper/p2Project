import { useEffect, useState } from "react";
import { UserInterface } from "../Interfaces/UserInterface";
import { UserContext } from "./UserContext";
import { UserContextInterface } from "../Interfaces/UserContextInterface";

export const UserProvider: React.FC<any> = ({children}) => {
    const [currentUser, setCurrentUser] = useState<UserInterface| null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            const item = JSON.parse(storedUser);
            const now = new Date();
            if (now.getTime() > item.expiration) {
                localStorage.removeItem('currentUser');
                setCurrentUser(null);
            } else {
                setCurrentUser(item.user);
            }
        }
    }, []);

    useEffect(() => {
        if (currentUser) {
            const now = new Date();
            // Set currentUser to expire after 24 hours like the JWT
            const expiration = new Date(now.getTime() + 24*60*60*1000).getTime();
            const item = Object.assign({}, {
                user: currentUser,
                expiration: expiration
            });
            localStorage.setItem('currentUser', JSON.stringify(item));
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
