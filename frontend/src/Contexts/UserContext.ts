import { createContext } from "react";
import { UserContextInterface } from "../Interfaces/UserContextInterface";
import { UserInterface } from "../Interfaces/UserInterface";
import React from "react";

//This is the default values for our global user state data
const initialState:UserInterface = {
    id: 0,
    username: "",
    jwt: ""
};

/*The context includes two parameters:
1) userData: This is the actual user data that we want to share.
2) setUserData: This is a function that allows us to update the user data.

// We have to {define them first}, then {give them values} */
// export const UserContext = React.createContext<{
//     userData: UserInterface;
//     //this expects a UserInterface-type object, and sets UserData with the incoming data
//     setUserData: React.Dispatch<React.SetStateAction<UserInterface>>;
// }>({
//     userData: initialState, //setting the initial userData values to the defaults above
//     setUserData: () => {} //this is a placeholder, we'll define it in the Provider
// });

export const UserContext = createContext<UserContextInterface>({
    currentUser: initialState,
    setCurrentUser: () => {},
  });
  