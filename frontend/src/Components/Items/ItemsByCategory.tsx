import axios from "axios"
import React, { useContext, useState } from "react"
import { UserInterface } from "../../Interfaces/UserInterface"
import { UserContext } from "../../Contexts/UserContext";
import { useNavigate } from "react-router-dom";

export const ItemsByCategory: React.FC = ()=>{
//A variable to store user input for finding a pokemon
const [userInput, setUserInput] = useState("")

const { userData } = useContext(UserContext);

//we need our useNavigate hook to programmatically switch endpoints (which switches components)
const navigate = useNavigate()

//a function that stores the user input (Which we need for our GET request)
const gatherInput = (input:any) => {
    setUserInput(input.target.value) //set the userInput to what's in the input box
}

//a function that sends a GET to PokeAPI based on the user's input
const getItemByCategory= async () => {

    console.log(userInput)

    //sending our request to pokeAPI using the userInput as the pokemon id to search for
    const response = await axios.get("http://localhost:8080/" + userInput, 
    {
      withCredentials: true,
      headers: {
        'Authorization': 'Bearer: ' + userData.jwt
      }
    }
  )
}

    return (
        <div>
                 <h3>Search For a Pokemon!</h3>
                <input type="number" placeholder="Enter Pokemon ID" onChange={gatherInput}/>

        </div>
    )

}