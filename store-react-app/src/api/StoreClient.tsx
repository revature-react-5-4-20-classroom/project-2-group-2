import axios, { AxiosResponse } from 'axios';
import { FailedLoginError } from '../errors/FailedLoginError';


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