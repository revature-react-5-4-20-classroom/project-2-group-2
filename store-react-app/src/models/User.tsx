export class User {

    userId : number;
    username : string;
    password : string;
    firstName : string;
    lastName : string;
    email : string;
    address:string;
    addressCity:string;
    addressState:string;
    addressZipcode:string;

    constructor(userId : number, username:string, password:string,firstName:string, lastName:string, email:string, address:string, addressCity:string, addressState:string, addressZipcode:string){
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email  = email;
        this.address = address;
        this.addressCity = addressCity;
        this.addressState = addressState;
        this.addressZipcode = addressZipcode;
    }
}