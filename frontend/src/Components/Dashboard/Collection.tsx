import * as React from "react"
import axios from "axios"

/*
    This componenet will display the items of the user aka collection
    It recieves the userId as prop (COULD ALSO USE THE CONTEXT FOR GETTING THE USER WHO IS LOGGED IN)
*/
const Collection: React.FC<{
    userId: number
}> = ({userdId}) {
 

    // state to store collection
    const [ collection, setCollection ] = React.useState([])

    // title variable used as the header for the component
    const title = "Collection"

    // TODO get baseUrl frmo useConstext
    const baseUrl = "localhost:3000"


    // get collection on component rendering
    React.useEffect((): void => {

        // function to get collection of user
        const getCollection = async () => {

            // TODO set url to proper endpoint
            const url = `${baseUrl}\items\${userId}`;
            
            try {
                // fetch collection from server
                const { data, status } = await axios(url)
                // if fetch was successfull setCollection to data received
                if ( status === 200 ) {
                    setCollection(data)
                }
                // TODO add other catch?
            } catch (e) {
                // TODO check how to handle error
                console.log("Error fetching collection.")
            }
        }

        // invoke getCollection function
        getCollection()

    }, [])


    return (
        <>
            {/* section title */}
            <h2>{title}</h2>

            {/* display collection items */}
            {collection.map(item => {
                <CollectionItem
                    item = {item}
                />
            })}
        </>
    )
}

export default Collection
