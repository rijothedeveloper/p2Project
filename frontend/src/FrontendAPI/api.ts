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
}

// CollectionController
const myCollectionEndpoint = "/collections/my_collection";

/**
 * Get the current logged in users collection of items
 */
export const getCollection = async () => {
    const url = apiURL(myCollectionEndpoint);
    const response = await axios.get(url)
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

/**
 * Add an item to the collection
 * @param item - the item to add to the collection
 */
export const addItem = async (item: ItemInterface) => {
    const url = apiURL(addItemEndpoint);
    const response = await axios.post(url, item)
    .then((response: AxiosResponse) => {
        return response.data;
    })
    .catch((error: AxiosError) => {
        // Handle error response
    });
};

/**
 * Get all items in the collection
 */
export const getAllItems = async () => {
    const url = apiURL(getAllItemsEndpoint);
    const response = await axios.get(url)
    .then((response: AxiosResponse) => {
        return response.data;
    })
    .catch((error: AxiosError) => {
        // Handle error response
    });
};

/**
 * Get item by its id
 * @param itemId - id of the item to fetch
 */
export const getItemById = async (itemId: number) => {
    const url = apiURL(`${getItemByIdEndpoint}/${itemId}`);
    const response = await axios.get(url)
    .then((respones: AxiosResponse) => {
        return respones.data;
    })
    .catch((error: AxiosError) => {
        // Handle error response
    });
};

/**
 * Get item by its name
 * @param name - name of the item to fetch
 */
export const getItemByName = async (name: string) => {
    const url = apiURL(getItemByNameEndpoint + `/${name}`);
    const response = await axios.get(url)
    .then((response: AxiosResponse) => {
        return response.data;
    })
    .catch((error: AxiosError) => {
        // Handle error response
    });
};