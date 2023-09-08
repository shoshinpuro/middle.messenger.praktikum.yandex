import HTTPTransport from "../core/Fetch";

export type TUser = {
    phone?: string,
    email?: string,
    login?: string,
    first_name?:string,
    second_name?: string,
    password?: string,
    display_name?: string,
}

export class BaseAPI {
    http: HTTPTransport;
    constructor() {
        this.http = new HTTPTransport();
    }
    
    create() { throw new Error('Not implemented'); }
    
    request() { throw new Error('Not implemented'); }
    
    update() { throw new Error('Not implemented'); }
    
    delete() { throw new Error('Not implemented'); }
}

export const urlWS = "https://ya-praktikum.tech/WS/chats";

const url = "https://ya-praktikum.tech/api/v2";
export default url;
