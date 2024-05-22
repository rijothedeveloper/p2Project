import { useNavigate, useParams } from "react-router-dom"
import { ReviewInterface } from "../../Interfaces/ReviewInterface";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { UserContext } from "../../Contexts/UserContext";
import { getUserReviews } from "../../FrontendAPI/api";
import { useToast } from "../../Contexts/ToastContext";


export const AllRevByUser: React.FC = () => {
    const {userId} = useParams();
    const userIdNumber = Number(userId);
    

    const[revsByUser, setRevsByUser] = useState<ReviewInterface[]>([])
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const { addToast } = useToast();

    const navigate = useNavigate();
    useEffect(() => {
        getAllUsersRevs();
    },[])
    const getAllUsersRevs = async () => {
        const response = await getUserReviews(currentUser?.jwt as string, userIdNumber);
        if (typeof response === "string") {
            console.error(response);
            addToast(response, true, new Date());
            setRevsByUser([]);
        } else {
            setRevsByUser(response);
        }
    }

  
    //display could be changed (this was copy and pasted from my (Viktor) project 1)
    return(
        <div style={{margin:"8rem"}} className="d-flex flex-column justify-content-center align-items-center">
            <h3 style={{ textAlign:"center"}}><strong>Users Reviews</strong></h3>
            <div style={{width:"100%",  backgroundColor:"white", overflow: 'auto', maxHeight: '63vh', display: 'flex', justifyContent: 'center'}}> 
                    <Table striped bordered hover size="sm" style={{margin:"2rem", width:"60vw"}}>
                        <thead >
                            <tr>
                                <th style={{width: '33%'}}>Title</th>
                                <th style={{width: '33%'}}>Description</th>
                                <th style={{width: '33%'}}>Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {revsByUser && revsByUser.length > 0 ? 
                            revsByUser.map((rev, index) => 
                                <tr>
                                    <td style={{wordWrap: 'break-word', textAlign:"center"}}>
                                        {rev.title}
                                    </td>
                                    <td style={{wordWrap: 'break-word', textAlign:"center"}}>
                                        {rev.body}
                                    </td>
                                    <td style={{wordWrap: 'break-word', textAlign:"center"}}>
                                        {rev.rating}
                                    </td>
                                    
                                </tr>
                            ): "No data avaliable."}
                        </tbody>
                    </Table>
                <br />
            </div>
        </div>
    )
}