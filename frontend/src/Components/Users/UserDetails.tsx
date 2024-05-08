import { useState } from "react";
import { useParams } from "react-router-dom"
import { UserInterface } from "../../Interfaces/UserInterface";

export const UserDetails: React.FC = () => {

    const userId = useParams();

    const [user, setUser] = useState<UserInterface>({
        // TODO: this should be set to default user properties
    });

    if (userId) {
        // TODO: get user at user ID
    } else {
        // TODO: get user from context
    }

    return (

        <div>

        </div>
    )
}