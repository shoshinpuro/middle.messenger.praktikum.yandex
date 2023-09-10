import HTTPTransport from "../core/Fetch";

export type TUser = {
    id?: number,
    first_name?:string,
    second_name?: string,
    display_name?: string,
    phone?: string,
    login?: string,
    avatar?: string,
    email?: string,
    password?: string,
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
