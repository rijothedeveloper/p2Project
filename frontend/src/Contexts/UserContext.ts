import { createContext } from "react";
import { UserContextInterface } from "../Interfaces/UserContextInterface";

export const UserContext = createContext<UserContextInterface|undefined>(undefined);