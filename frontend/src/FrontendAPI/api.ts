// Centralized file for all backend calls

import axios, { AxiosError, AxiosResponse } from "axios";
import { ItemInterface } from "../Interfaces/ItemInterface";

// Current base URL
const baseURL = "http://localhost:8080";

/**
 * Helper function to build a URL
 * @param endpoint - The endpoint to connect to the server
 * @returns the base URL + the endpoint
 */
const apiURL = (endpoint: string) => {
    return baseURL + endpoint;
};

/**
 * Helper function to create authorization header with JWT token.
 * @param token - JWT token
 * @returns authorization header object
 */
const buildAuthHeader = (token: string) => {
    return Object.assign({}, {
        "Authorization": `Bearer ${token}`
    });
};

// CollectionController
const myCollectionEndpoint = "/collections/my_collection";

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
const getAllItemsEndpoint = itemControllerEndpoint;
const getItemByIdEndpoint = itemControllerEndpoint + "/id";
const getItemByNameEndpoint = itemControllerEndpoint + "/name";
const deleteItemEndpoint = itemControllerEndpoint;
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
export const getAllItems = async (token: string) => {
    const url = apiURL(getAllItemsEndpoint);
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

// ReviewController

// ScoreController

// UserController
const findUserByUsernameEndpoint = "/users";

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