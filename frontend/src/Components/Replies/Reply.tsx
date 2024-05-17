export const Reply: React.FC = (reply:any) => {

    //Reply needs reply information to be passed to it.  Once the information is received it will display the information.
    //Reply should have 2 elements the reply ID and the body.  Display the body for each reply since the reply ID isn't necessary.

    return(
        <div>
            <p>{reply.body}</p>
        </div>
    )
}