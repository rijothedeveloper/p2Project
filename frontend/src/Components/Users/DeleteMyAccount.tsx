import axios from "axios"
import { useNavigate } from "react-router-dom";

export const DeleteMyAccount: React.FC = () => {

    //This component created by Martin Manger

    //Firstly we will need to get the current users account details.  More specifically their ID.  
    //Then we will verify that they actually want to delete their account, prompt the user for a confirmation.
    //Then we initiate both the deletion of a user (html delete call) and forcefully end their session and redirect them to the main page.

    //This button will exist in the navbar since we want all users to be able to delete their own account at any point.  Hopefully the backend will handle the deletion of all replies and reviews but if not then we can handle it here if an endpoint is set up for it.

    const navigate = useNavigate();

    const deleteOwnAccount = async () => {
        //This function will run the html call to delete an account passing in the current users information so the backend can handle the deletion.

        const response = axios.delete("HTMLADDRESSNEEDSFIXING", {withCredentials:true}) //We need to know what to pass where and if there is data in the request body that needs to be sent.
        .then((response) => {alert(response.data)})  //for now alert any message returned from the delete command
        .then(() => {navigate("/")})  //then go back to the main splash page.  We also need to end their session and reset any variables associated with such.
        .catch((error) => {alert(error.response.data)})  //If there is an error then display the error in an alert.  Likely to change.
    }


    const verifyDelete = () => {
        //This function will prompt the user to confirm or deny that they wish to delete their account.  If the user says no then nothing happens, if yes then call deleteOwnAccount
        let verified = window.confirm("Would you like to delete your own account? \nThis will also delete your reviews and replies, \nas well as any replies attached to those reviews. \n \nPress OK to delete your account or Cancel to cancel.")
        if(verified){
            deleteOwnAccount()
        }else{

        }
    }



    return(
        <button onClick={verifyDelete}>Delete my account</button>
    )


}