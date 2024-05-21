import { UserInterface } from "./UserInterface";

export interface UserContextInterface {
    currentUser: UserInterface | null;
    setCurrentUser: React.Dispatch<React.SetStateAction<UserInterface | null>>;
}