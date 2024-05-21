import { ReviewInterface } from "./ReviewInterface";

export interface UserInterface {
    reviews?: ReviewInterface[];
    id?: number,
    firstName?: string,
    lastName?: string,
    username?: string,
    password?: string,
    role?: string,
    email?:string,
    timestamp?:string,
    follow?:any
    collection?:any
    jwt?:string;
}