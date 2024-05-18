import React, { useState } from 'react';
import { UserContext } from './UserContext'; // assuming UserContext is in the same directory
import { UserInterface } from '../Interfaces/UserInterface';


/* This component will provide the UserContext to all of its child components
 we will wrap this around EVERY component we render in the app.tsx, to make it globally visible

 The children prop represents whatever you wrap with the provider (our entire app.tsx div) */
export const UserProvider: React.FC<any> = ({children}) => {

    //define the globally visible state
    const [userData, setCurrentUser] = useState<UserInterface>({
        id: 0,
        username: "",
        jwt: ""
    });

    //note that we're making the state variable AND the mutator available to all child components
    return (
        <UserContext.Provider value={{ userData, setCurrentUser}}>
            {children}
        </UserContext.Provider>
    );
};