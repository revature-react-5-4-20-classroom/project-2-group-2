import axios, { AxiosResponse } from 'axios';
import { FailedLoginError } from '../errors/FailedLoginError';
import { Item } from '../models/Item';
import {User} from '../models/User';
import { prnt } from '../Helpers';


// For project work, take note that axios interprets non-200s response statuses as errors
// This means you can handle auth problems using try-catch

// We can create a client with config for convenience, then call our methods
// on that client instead of an axios directly. This lets up set up configuration
// without repeating ourselves

export const storeClient = axios.create({
    baseURL : 'http://localhost:8080', // Use this to test on your local machine, leave commented out.
    //baseURL : 'http://18.216.197.108:8080',
    //if you don't have the following line, your login won't work
    withCredentials: false, // we should probably change this later
})


export async function submitReview(rate:string, text:string, userId:string, itemId:string ){
    try{
        const response =  await storeClient.post('/review', {rating:rate, content: text, userId:userId, itemId:itemId});
        return response;
    } catch (e){
        console.log(e)
    }
}

export async function createUser(username:string,password:string,email:string,firstName:string,lastName:string,address:string,city:string,state:string,zipCode:string){
    try{
        const response = await storeClient.post('/newuser', {username:username,password:password, email:email, firstName:firstName, lastName:lastName, address:address, addressCity:city, addressState:state,addressZipcode:zipCode});
        return response;
    }catch(e){
        console.log(e)
    }
}


//implement login later. needs new user object

export async function login(un:string, pw:string)
{
    try
    {
        const response =  await storeClient.post('/login', {username:un, password: pw});

        const {userId, username,password, firstName, lastName , email, address, addressCity,addressState, addressZipcode} = response.data;
        console.log(response.data);
        return new User(userId, username, password, firstName, lastName, email, address, addressCity, addressState, addressZipcode);
    } 
    catch (e)
    {
        if(e.response.status === 401){
            throw new FailedLoginError('Failed to authenticate', un);
        } else{
            //We could throw a different custom error, this exposes a little too much to the user
            throw e;
        }
    }
   
}

// getting items by category - will send a get request to the appropriate backend endpoint
// takes category id as an input - we may need to change this (or the endpoint) depending on how we set up our back end
export async function getItemsByCategory(id: number) : Promise<any[]> {
    try {
        const response = await storeClient.get(`/items/category/${id}`);
        return response.data.map((itemObj: any) => {
           const {itemId, itemName, price, description, categoryId, avgRating, imgPath} = itemObj;
           return new Item(itemId, itemName, price, description, categoryId, avgRating, imgPath);
        })
    } catch(e) {
        // Add more error functionality later
        console.log(e.message);
        throw e;
    }
}

export async function getAllItems() : Promise<any[]> {
    try {
        const response = await storeClient.get(`/items`);
        return response.data.map((itemObj: any) => {
           const {itemId, itemName, price, description, categoryId, avgRating, imgPath} = itemObj;
           return new Item(itemId, itemName, price, description, categoryId, avgRating, imgPath);
        })
    } catch(e) {
        // Add more error functionality later
        console.log(e.message);
        throw e;
    }
}

// function for getting items via search term
export async function getItemsBySearchParam(param: string) : Promise<any[]> {
    try {
        const response = await storeClient.get(`/items/search/${param}`);
        return response.data.map((itemObj: any) => {
            const {itemId, itemName, price, description, categoryId, avgRating, imgPath} = itemObj;
            return new Item(itemId, itemName, price, description, categoryId, avgRating, imgPath);
         });
    } catch(e) {
        console.log(e.message);
        throw e;
    }
}

// function for getting a single item by id
export async function getItemById(id: number) : Promise<any> {
    try {
        const response = await storeClient.get(`items/itemId/${id}`);
        const {itemId, itemName, price, description, categoryId, avgRating, imgPath} = response.data;
        return new Item(itemId, itemName, price, description, categoryId, avgRating, imgPath);
    } catch(e) {
        console.log(e.message);
        throw e;
    }
}