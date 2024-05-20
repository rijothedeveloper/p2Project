// Centralized file for all backend calls

import axios, { AxiosError, AxiosResponse } from "axios";
import { ItemInterface } from "../Interfaces/ItemInterface";
import { useNavigate } from "react-router-dom";
import { UserInterface } from "../Interfaces/UserInterface";
import { ReplyInterface } from "../Interfaces/ReplyInterface";


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
const buildAuthHeader = (token: string|undefined) => {
    return Object.assign({}, {
        "Authorization": `Bearer ${token}`
    });
};


// CollectionController
export const myCollectionEndpoint = "/collections/my_collection";

/**
 * Get the current logged in users collection of items
 * @param token - JWT token
 */
export const getCollection = async (token: string) => {
    const url = apiURL(myCollectionEndpoint);
    const authHeader = buildAuthHeader(token);
    const response = await axios.get(url, {headers: authHeader})
    .then((response: AxiosResponse) => {
        return response.data;
    })
    .catch((error: AxiosError) => {
        // Handle error response
    });
};


// FollowController

// ItemController
const itemControllerEndpoint = "/items";
const addItemEndpoint = itemControllerEndpoint;
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
export const addItem = async (token: string, item: ItemInterface) => {
    const url = apiURL(addItemEndpoint);
    const authHeader = buildAuthHeader(token);
    const response = await axios.post(url, item, {headers: authHeader})
    .then((response: AxiosResponse) => {
        return response.data;
    })
    .catch((error: AxiosError) => {
        // Handle error response
    });
};

/**
 * Get all items in the collection
 * @param token - JWT token
 */
export const getAllItems = async (token: string | undefined): Promise<ItemInterface[]> => {
    const url = apiURL(getAllItemsEndpoint);
    const authHeader = buildAuthHeader(token);
    const response = await axios.get(url, {headers: authHeader})
        
    return response.data;
};

/**
 * Get item by its category
 * @param token - JWT token
 * @param itemId - id of the item to fetch
 */
export const itemsByCategory = async (token: string | undefined, category: string): Promise<ItemInterface[]> => {
    const url = apiURL(`${itemControllerEndpoint }/${category}`);
    const authHeader = buildAuthHeader(token);
    const response = await axios.get(url, {headers: authHeader})
    
    return response.data;

};

/**
 * Get item by its id
 * @param token - JWT token
 * @param itemId - id of the item to fetch
 */
export const getItemById = async (token: string, itemId: number) => {
    const url = apiURL(`${getItemByIdEndpoint}/${itemId}`);
    const authHeader = buildAuthHeader(token);
    const response = await axios.get(url, {headers: authHeader})
    .then((respones: AxiosResponse) => {
        return respones.data;
    })
    .catch((error: AxiosError) => {
        // Handle error response
    });
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
        // Handle error response
    });
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

// ReplyController
const fetchRepliesEndpoint = "/replies";

/**
 * Get all replies for a review
 * @param token - JWT token
 * @param ID - ID of the review to fetch replies for
 */
export const getAllRepliesByReview = async (token: string, ID: number) : Promise<ReplyInterface[]|String> => {
    const url = apiURL(`${fetchRepliesEndpoint}/${ID}`);
    const authHeader = buildAuthHeader(token);
    const response = await axios.get<ReplyInterface[]>(url, {headers: authHeader})
    .then((response: AxiosResponse<ReplyInterface[]>) => {
        return response.data;
    })
    .catch((error: AxiosError) => {
        // Handle error response
        return error.message ? error.message: "No Replies";
    });
    return "No Replies";
};
const replyControllerEndpoint = "/replies";
const addReplyEndpoint = replyControllerEndpoint;

/**
 * Add a reply to a review
 * @param token - JWT token
 * @param reply - the reply to add
 * @returns the reply that was added
 */
export const addReply = async (token: string, reply: ReplyInterface) => {
    const url = apiURL(`${addReplyEndpoint}/${reply.reviewId}`);
    const authHeader = buildAuthHeader(token);
    const response = await axios.post(url, {reply}, {headers: authHeader})
    .then((response: AxiosResponse) => {
        return response.data;
    })
    .catch((error: AxiosError) => {
        // Handle error response
    });

};

// ReviewController
const deleteReviewEndpoint = "/reviews";


/**
 * Delete review by ID
 * @param token - JWT token
 * @param reviewid - ID of the review to delete
 */
export const deleteReviewByID = async (token: string, reviewid: number) => {
    const url = apiURL(`${deleteReviewEndpoint}/${reviewid}`);
    const authHeader = buildAuthHeader(token);
    const response = await axios.delete(url, {headers: authHeader})
    .then((response: AxiosResponse) => {
        return response.data;
    })
    .catch((error: AxiosError) => {alert(error)});
};


// ScoreController

// UserController
const loginEndpoint = "/users/login";
const registerEndpoint = "/users/add";
const findUserByUsernameEndpoint = "/users";

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
export const findUserByUsername = async (token: string, username: string) => {
    const url = apiURL(`${findUserByUsernameEndpoint}/${username}`);
    const authHeader = buildAuthHeader(token);
    const response = await axios.get(url, {headers: authHeader})
    .then((response: AxiosResponse) => {
        return response.data;
    })
    .catch((error: AxiosError) => {
        // Handle error response
    });
};

const deleteUserEndpoint = "/users";

/**
 * Delete user by ID
 * @param token - JWT token
 * @param userid - ID of the user to delete
 */
export const deleteUserByID = async (token: string, userid: number) => {
    const url = apiURL(`${deleteUserEndpoint}/${userid}`);
    const authHeader = buildAuthHeader(token);
    const response = await axios.delete(url, {headers: authHeader})
    .then((response: AxiosResponse) => {
        return response.data;
    })
    .catch((error: AxiosError) => {alert(error)});
};

