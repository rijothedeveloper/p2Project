// Centralized file for all backend calls

import axios, { AxiosError, AxiosResponse } from "axios";
import { ItemInterface } from "../Interfaces/ItemInterface";
import { UserInterface } from "../Interfaces/UserInterface";
import { ReplyInterface } from "../Interfaces/ReplyInterface";
import { ReviewInterface } from "../Interfaces/ReviewInterface";

// Current base URL
export const baseURL = "http://localhost:8080";

/**
 * Helper function to build a URL
 * @param endpoint - The endpoint to connect to the server
 * @returns the base URL + the endpoint
 */
export const apiURL = (endpoint: string) => {
    return baseURL + endpoint;
};

/**
 * Helper function to create authorization header with JWT token.
 * @param token - JWT token
 * @returns authorization header object
 */
export const buildAuthHeader = (token: string|undefined) => {
    return Object.assign({}, {
        "Authorization": `Bearer ${token}`
    });
};


/*------------------------------
CollectionController
------------------------------*/
export const myCollectionEndpoint = "/collections/my_collection";
const addItemToCollectionEndpoint = "/collections";
const removeItemFromCollectionEndpoint = "/collections";
const myCollectionItemEndpoint = "/collections/id" // /{itemId}/user/{userId}

/**
 * Get the current logged in users collection of items
 * @param token - JWT token
 */
export const getCollection = async (token: string): Promise<ItemInterface[]> => {
    const url = apiURL(myCollectionEndpoint);
    const authHeader = buildAuthHeader(token);
    try {
        const response = await axios.get(url, {headers: authHeader});
        if (response.status !== 200) {
            throw new Error(response.data);
        }
        return response.data;
    } catch (error: any) {
        console.log(error.message);
        return [];
    }
};

export const addItemToCollection = async (token: string, item: ItemInterface): Promise<{status: boolean, message: string}> => {
    const url = apiURL(addItemToCollectionEndpoint);
    const authHeader = buildAuthHeader(token);
    console.log(item.name)
    try {
        const response = await axios.post(url, {itemId:item.id}, {headers: authHeader});
        if (response.status !== 201) {
            throw new Error(response.data);
        }
        return Object.assign({}, {
            status: true,
            message: response.data
        });
    } catch (error: any) {
        return Object.assign({}, {
            status: false,
            message: error.message
        });
    }
}

export const removeItemFromCollection = async (token: string, itemId: number): Promise<{status: boolean, message: string}> => {
    const url = apiURL(`${removeItemFromCollectionEndpoint}/${itemId}`);
    const authHeader = buildAuthHeader(token);
    try {
        const response = await axios.delete(url, {headers: authHeader});
        if (response.status !== 200) {
            throw new Error(response.data);
        }
        return Object.assign({}, {
            status: true,
            message: response.data
        })
    } catch (error: any) {
        return Object.assign({}, {
            status: false,
            message: error.message
        });
    }
}

export const getCollectionItem = async (token: string, itemId: number, userId: number): Promise<{status:boolean, message: string}> => {
    const url = apiURL(`${myCollectionItemEndpoint}/${itemId}/user/${userId}`);
    const authHeader = buildAuthHeader(token);
    try {
        const response = await axios.get(url, {headers: authHeader});
        if (response.status !== 200) {
            throw new Error(response.data);
        }
        return Object.assign({}, {
            status: true,
            message: "Collection item found!"
        });
    } catch (error: any) {
        return Object.assign({}, {
            status: false,
            message: error.message
        });
    }
};

/*------------------------------
FollowController
------------------------------*/

/*------------------------------
ItemController
------------------------------*/
const itemControllerEndpoint = "/items";
const addItemEndpoint = itemControllerEndpoint + "/add";
export const getAllItemsEndpoint = itemControllerEndpoint;
const getItemByIdEndpoint = itemControllerEndpoint + "/id";
const getItemByNameEndpoint = itemControllerEndpoint + "/name";
export const deleteItemEndpoint = itemControllerEndpoint;
const updateItemEndpoint = itemControllerEndpoint;

/**
 * Add an item to the collection
 * @param token - JWT token
 * @param item - the item to add to the collection
 */
export const addItem = async (token: string, item: ItemInterface): Promise<{
    status: boolean,
    message: string
}> => {
    const url = apiURL(addItemEndpoint);
    const authHeader = buildAuthHeader(token);
    try {
        const response = await axios.post(url, item, {headers: authHeader});
        if (response.status !== 201) {
            throw new Error(response.data);
        }
        return Object.assign({}, {
            status: true,
            message: "Item added successfully!"
        });
    } catch (error: any) {
        return Object.assign({}, {
            status: true,
            message: error.message
        });
    }
};

/**
 * Get all items in the collection
 * @param token - JWT token
 */
export const getAllItems = async (token: string): Promise<{
    status: boolean,
    message: string,
    data: ItemInterface[]
}> => {
    const url = apiURL(getAllItemsEndpoint);
    const authHeader = buildAuthHeader(token);
    try {
        const response = await axios.get(url, {headers: authHeader});
        if (response.status !== 200) {
            throw new Error(response.data);
        }
        return Object.assign({}, {
            status: true,
            message: "Successfully retrieved all items!",
            data: response.data
        });
    } catch (error: any) {
        return Object.assign({}, {
            status: false,
            message: error.message,
            data: []
        });
    }
};

/**
 * Get item by its id
 * @param token - JWT token
 * @param itemId - id of the item to fetch
 */
export const getItemById = async (token: string, itemId: number): Promise<{
    status: boolean,
    message: string,
    data: ItemInterface
}> => {
    const url = apiURL(`${getItemByIdEndpoint}/${itemId}`);
    const authHeader = buildAuthHeader(token);
    try {
        const response = await axios.get(url, {headers: authHeader});
        if (response.status !== 200) {
            throw new Error(response.data);
        }
        return Object.assign({}, {
            status: true,
            message: `Item found with ID: ${itemId}`,
            data: response.data
        });
    } catch (error: any) {
        return Object.assign({}, {
            status: false,
            message: error.message as string,
            data: {} as ItemInterface
        });
    }
};

/**
 * Get item by its name
 * @param token - JWT token
 * @param name - name of the item to fetch
 */
export const getItemByName = async (token: string, name: string) => {
    const url = apiURL(getItemByNameEndpoint + `/${name}`);
    const authHeader = buildAuthHeader(token);
    const response = await axios.get(url, {headers: authHeader})
    .then((response: AxiosResponse) => {
        return response.data;
    })
    .catch((error: AxiosError) => {
        console.log(error.message);
        // Handle error response
    });
};

export const getItemsByCategory = async (token: string, category: string): Promise<ItemInterface[]|string> => {
    const url = apiURL(itemControllerEndpoint + `/${category}`);
    const authHeader = buildAuthHeader(token);
    try {
        const response = await axios.get(url, {headers: authHeader});
        if (response.status !== 200) {
            throw new Error(response.data);
        }
        return response.data;
    } catch (error: any) {
        return error.message;
    }
};

/**
 * Delete an item by its id
 * @param token - JWT token
 * @param itemId - id of the item to delete
 */
export const deleteItem = async (token: string, itemId: number) => {
    const url = apiURL(`${deleteItemEndpoint}/${itemId}`);
    const authHeader = buildAuthHeader(token);
    const response = await axios.delete(url, {headers: authHeader})
    .then((response: AxiosResponse) => {
        return response.data;
    })
    .catch((error: AxiosError) => {
        // Handle error response
    });
};

/**
 * Update an item by its id
 * @param token - JWT token
 * @param itemId - id of the item to update
 * @param item - data to update the item with
 */
export const updateItem = async (token: string, itemId: number, item: ItemInterface) => {
    const url = apiURL(`${updateItemEndpoint}/${itemId}`);
    const authHeader = buildAuthHeader(token);
    const response = await axios.patch(url, item, {headers: authHeader})
    .then((response: AxiosResponse) => {
        return response.data;
    })
    .catch((error: AxiosError) => {
        // Handle error response
    });
};

/*------------------------------
ReplyController
------------------------------*/
const replyControllerEndpoint = "/replies";
const addReplyEndpoint = replyControllerEndpoint;

/**
 * Get all replies for a review
 * @param token - JWT token
 * @param reviewId - ID of the review to fetch replies for
 */
export const getAllRepliesByReview = async (token: string, reviewId: number) : Promise<{
    status: boolean,
    message: string,
    data: ReviewInterface[]
}> => {
    const url = apiURL(`${replyControllerEndpoint}/review/${reviewId}`);
    const authHeader = buildAuthHeader(token);
    try {
        const response = await axios.get(url, {headers: authHeader});
        if (response.status !== 200) {
            throw new Error(response.data);
        }
        return Object.assign({}, {
            status: true,
            message: "Successfully retrieved replies for review",
            data: response.data
        });
    } catch (error: any) {
        return Object.assign({}, {
            status: false,
            message: error.message ? error.message : "No Replies",
            data: []
        })
    }
    /* Used try-catch block for typing, returning an object for consistent handling of request status, feedback and data typing - NEIL
    .then((response: AxiosResponse<ReplyInterface[]>) => {
        return response.data;
    })
    .catch((error: AxiosError) => {
        // Handle error response
        return error.message ? error.message: "No Replies";
    });
    return "No Replies";*/
};

/**
 * Add a reply to a review
 * @param token - JWT token
 * @param reply - the reply to add
 * @returns the reply that was added
 */
export const addReply = async (token: string, reply: ReplyInterface): Promise<{
    status: boolean,
    message: string,
    data: ReplyInterface
}> => {
    console.log(`REPLY TO ADD: ${JSON.stringify(reply)}`)
    const url = apiURL(addReplyEndpoint);
    console.log(`URL TO ADD REPLY: ${url}`)
    const authHeader = buildAuthHeader(token);
    try {
        const response = await axios.post(url, reply, {headers: authHeader});
        if (response.status !== 201) {
            throw new Error(response.data);
        }
        return Object.assign({}, {
            status: true,
            message: "Successfully added a reply",
            data: response.data
        });
    } catch (error: any) {
        return Object.assign({}, {
            status: false,
            message: error.message,
            data: {}
        });
    }
};

/*------------------------------
ReviewController
------------------------------*/
const reviewControllerEndpoint = "/reviews";
const getUserReviewsEndpoint = reviewControllerEndpoint + "/user";
export const deleteReviewByIdEndpoint = reviewControllerEndpoint + "/delete";

export const getAllReviews = async (token: string): Promise<{
    status: boolean,
    message: string,
    data: ReviewInterface[]
}> => {
    const url = apiURL(reviewControllerEndpoint);
    const authHeader = buildAuthHeader(token);
    try {
        const response = await axios.get(url, {headers: authHeader});
        if (response.status !== 200) {
            throw new Error(response.data);
        }
        return Object.assign({}, {
            status: true,
            message: "Successfully retrieved all reviews",
            data: response.data
        });
    } catch (error: any) {
        return Object.assign({}, {
            status: true,
            message: error.message,
            data: []
        });
    }
};

export const getUserReviews = async (token: string, userId: number): Promise<ReviewInterface[]|string> => {
    const url = apiURL(`${getUserReviewsEndpoint}/${userId}`);
    const authHeader = buildAuthHeader(token);
    try {
        const response = await axios.get(url, {headers: authHeader});
        if (response.status !== 200) {
            throw new Error(response.data);
        }
        return response.data
    } catch (error: any) {
        return error.message;
    }
}

export const getItemReviews = async (token: string, itemId: number): Promise<{
    status: boolean,
    message: string,
    data: ReviewInterface[]
}> => {
    const url = apiURL(`${reviewControllerEndpoint}/item/${itemId}`);
    const authHeader = buildAuthHeader(token);
    try {
        const response = await axios.get(url, {headers: authHeader});
        if (response.status !== 200) {
            throw new Error(response.data);
        }
        return Object.assign({}, {
            status: true,
            message: "Successfully retrieved reviews!",
            data: response.data
        });
    } catch (error: any) {
        return Object.assign({}, {
            status: false,
            message: error.message,
            data: []
        });
    }
};

/**
 * Delete review by ID
 * @param token - JWT token
 * @param reviewid - ID of the review to delete
 */
export const deleteReviewByID = async (token: string, reviewId: number): Promise<{
    status: boolean,
    message: string
}> => {
    const url = apiURL(`${reviewControllerEndpoint}/delete/${reviewId}`);
    const authHeader = buildAuthHeader(token);
    try {
        const response = await axios.delete(url, {headers: authHeader});
        if (response.status !== 200) {
            throw new Error(response.data);
        }
        return Object.assign({}, {
            status: true,
            message: response.data
        });
    } catch (error: any) {
        return Object.assign({}, {
            status: false,
            message: error.nmessage
        })
    }
};


/*------------------------------
ScoreController
------------------------------*/
const voteControllerEndpoint = "/scores";

export const newVote = async (token: string, reviewId: number, vote: number): Promise<{
    status: boolean,
    message: string,
    data: ReviewInterface
}> => {
    const url = apiURL(`${voteControllerEndpoint}/${reviewId}`);
    const authHeader = buildAuthHeader(token);
    const headers = Object.assign(authHeader, {
        'Content-Type': 'application/json'
    });
    try {
        const response = await axios.post(url, vote, {headers: headers});
        if (response.status !== 201) {
            throw new Error(response.data);
        }
        return Object.assign({}, {
            status: true,
            message: "Successfully casted new vote!",
            data: response.data
        });
    } catch (error: any) {
        return Object.assign({}, {
            status: false,
            message: error.message,
            data: {}
        });
    }
};

export const updateVote = async (token: string, reviewId: number, vote: number): Promise<{
    status: boolean,
    message: string,
    data: ReviewInterface
}> => {
    const url = apiURL(`${voteControllerEndpoint}/${reviewId}`);
    const authHeader = buildAuthHeader(token);
    const headers = Object.assign(authHeader, {
        'Content-Type': 'application/json'
    });
    try {
        const response = await axios.put(url, vote, {headers: headers});
        if (response.status !== 202) {
            throw new Error(response.data);
        }
        return Object.assign({}, {
            status: true,
            message: "Successfully updated vote!",
            data: response.data
        });
    } catch (error: any) {
        return Object.assign({}, {
            status: false,
            message: error.message,
            data: {}
        });
    }
};

export const deleteVote = async (token: string, reviewId: number): Promise<{
    status: boolean,
    message: string,
    data: ReviewInterface
}> => {
    const url = apiURL(`${voteControllerEndpoint}/${reviewId}`);
    const authHeader = buildAuthHeader(token);
    try {
        const response = await axios.delete(url, {headers: authHeader});
        if (response.status !== 204) {
            throw new Error(response.data);
        }
        return Object.assign({}, {
            status: true,
            message: "Successfully deleted vote!",
            data: response.data
        });
    } catch (error: any) {
        return Object.assign({}, {
            status: false,
            message: error.message,
            data: {}
        });
    }
};

export const getUserVote = async (token: string, reviewId: number): Promise<{
    status: boolean,
    message: string,
    data: number
}> => {
    const url = apiURL(`${voteControllerEndpoint}/${reviewId}`);
    const authHeader = buildAuthHeader(token);
    try {
        const response = await axios.get(url, {headers: authHeader});
        if (response.status !== 200) {
            throw new Error(response.data);
        }
        return Object.assign({}, {
            status: true,
            message: "Successfully updated vote!",
            data: response.data
        });
    } catch (error: any) {
        return Object.assign({}, {
            status: false,
            message: error.message,
            data: 0
        });
    }
};

/*------------------------------
UserController
------------------------------*/
const loginEndpoint = "/users/login";
const registerEndpoint = "/users/add";
const findUserByUsernameEndpoint = "/users/user";
const deleteUserEndpoint = "/users/delete";
const getAllUsersEndpoint = "/users/all";
const suspendUserEndpoint = "/users/suspend";

export const login = async (user: UserInterface): Promise<UserInterface|string> => {
    const url = apiURL(loginEndpoint);
    try {
        const response = await axios.post<UserInterface>(url, user);
        return response.data;
    } catch (error: any) {
        return error.message ? error.message: "Failed to login";
    }
};

export const register = async (user: UserInterface): Promise<string|boolean> => {
    const url = apiURL(registerEndpoint);
    try {
        const response = await axios.post<undefined>(url, user);
        console.log("Successfully registered user!");
        return true;
    } catch (error: any) {
        return error.message ? error.message: "Failed to register!";
    }
};

/**
 * Find a user by username
 * @param token - JWT token
 * @param username - username of the user to fetch
 */
export const findUserByUsername = async (token: string, username: string): Promise<UserInterface>=> {
    const url = apiURL(`${findUserByUsernameEndpoint}/${username}`);
    const authHeader = buildAuthHeader(token);
    const response = await axios.get(url, {headers: authHeader})
    .then((response: AxiosResponse) => {
        return response.data;
    })
    .catch((error: AxiosError) => {
        // Handle error response
    });

    return response; // Add this line to return the response data
};

/**
 * Delete user by ID
 * @param token - JWT token
 * @param userid - ID of the user to delete
 */
export const deleteUserByID = async (token: string, userid: number): Promise<{status: boolean, message: string}> => {
    const url = apiURL(`${deleteUserEndpoint}/${userid}`);
    const authHeader = buildAuthHeader(token);
    try {
        const response = await axios.delete(url, {headers: authHeader});
        if (response.status !== 200) {
            throw new Error(response.data);
        }
        return Object.assign({}, {
            status: true,
            message: response.data
        });
    } catch (error: any) {
        return Object.assign({}, {
            status: false,
            message: error.message
        });
    }
};

export const getAllUsers = async (token: string): Promise<UserInterface[]|string> => {
    const url = apiURL(getAllUsersEndpoint);
    const authHeader = buildAuthHeader(token);
    try {
        const response = await axios.get(url, {headers: authHeader});
        if (response.status !== 200) {
            throw new Error(response.data);
        }
        return response.data;
    } catch (error: any) {
        return error.message;
    }
};

export const suspendUserByUsername = async (token: string, username: string): Promise<{
    status: boolean,
    message: string
}> => {
    const url = apiURL(`${suspendUserEndpoint}/${username}`);
    const authHeader = buildAuthHeader(token);
    try {
        const response = await axios.patch(url, {}, {headers: authHeader});
        if (response.status !== 200) {
            throw new Error(response.data)
        }
        return Object.assign({}, {
            status: true,
            message: "Successfully suspended " + username
        });
    } catch (error: any) {
        return Object.assign({}, {
            status: false,
            message: "Failed to suspend " + username
        });
    }

}
