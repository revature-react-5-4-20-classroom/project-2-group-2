import axios, { AxiosResponse } from 'axios';
import { FailedLoginError } from '../errors/FailedLoginError';
import { Item } from '../models/Item';


// For project work, take note that axios interprets non-200s response statuses as errors
// This means you can handle auth problems using try-catch

// We can create a client with config for convenience, then call our methods
// on that client instead of an axios directly. This lets up set up configuration
// without repeating ourselves

const storeClient = axios.create({
    baseURL : 'http://18.216.197.108:3005',
    //if you don't have the following line, your login won't work
    withCredentials: true,
})


export async function submitReview(rate:string, text:string, userId:string, itemId:string ){
    try{
        const response =  await storeClient.post('/review', {rating:rate, content: text, userId:userId, itemId:itemId});
    } catch (e){
        console.log(e)
    }
}







//implement login later. needs new user object

// export async function login(un:string, pw:string){
//     try{
//         const response =  await storeClient.post('/login', {username:un, password: pw});
//         const {userId, username,password, firstName, lastName , email, roleId} = response.data;
//         console.log(response.data);
//         return new User(userId, username, password, firstName, lastName, email, roleId);
//     } catch (e){
//         if(e.response.status === 401){
//             throw new FailedLoginError('Failed to authenticate', un);
//         } else{
//             //We could throw a different custom error, this exposes a little too much to the user
//             throw e;
//         }
//     }
   
// }

// getting items by category - will send a get request to the appropriate backend endpoint
// takes category id as an input - we may need to change this (or the endpoint) depending on how we set up our back end
export async function getItemsByCategory(id: number) : Promise<any[]> {
    try {
        const response = await storeClient.get(`/items/category/${id}`);
        return response.data.map((itemObj: any) => {
           const {item_id, item_name, price, description, category_id, avg_rating, img_path} = itemObj;
           return new Item(item_id, item_name, price, description, category_id, avg_rating, img_path);
        })
    } catch(e) {
        // Add more error functionality later
        throw e;
    }
}