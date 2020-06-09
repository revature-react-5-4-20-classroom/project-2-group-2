export class FailedLoginError extends Error {
    username : string | undefined;
    constructor(message?:string, username?: string){
        super(message);
        this.username = username;
    }
}