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
const addItemEndpoint = "/items";
const getAllItemsEndpoint = "/items";

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