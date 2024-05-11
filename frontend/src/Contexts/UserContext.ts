import { createContext } from "react";
import { UserContextInterface } from "../Interfaces/UserContextInterface";

// Provide a default user context for TypeScript
export const UserContext = createContext<UserContextInterface>({
    currentUser: null,
    setCurrentUser: () => {}
});