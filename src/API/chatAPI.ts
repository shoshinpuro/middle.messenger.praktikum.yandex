import HTTPTransport from '../core/Fetch';
import url from './baseAPI';
//import { TIndexed } from '../utils/utilFunctions';

export interface ICreateChat {
    title?: string,
    chatId?: string | ICreateChat
}
export interface IAddUsersInChat {
    users: any[],
    chatId: number | undefined,
}

class ChatAPI {
    http: HTTPTransport;

    constructor() {
        this.http = new HTTPTransport();
    }

    getChats() {
        return this.http.get(url + '/chats');
    }
    createChat(data:ICreateChat){
        return this.http.post(url + '/chats', {data});
    }
    deleteChat(data:ICreateChat){
        return this.http.delete(url + '/chats', {data});
    }
    addUsers(data: IAddUsersInChat) {
        return this.http.put(url + '/chats/users',{data});
    }
    deleteUsers(data: IAddUsersInChat){
        return this.http.delete(url + '/chats/users', {data});
    }
    getChatToken(data: number) {
        return this.http.post(url + `/chats/token/${data}`);
    }
}
export default ChatAPI;
