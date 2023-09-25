import HTTPTransport from '../core/Fetch';
import url from './baseConstants';
// import { TIndexed } from '../utils/utilFunctions';

export interface ICreateChat {
    title?: string,
    chatId?: string | number | ICreateChat
}
export interface IAddUsersInChat {
    users: Array<string | number>,
    chatId: number
}

class ChatAPI {
    http: HTTPTransport;

    constructor() {
        this.http = new HTTPTransport();
    }

    async getChats() {
        return this.http.get(`${url}/chats`);
    }

    async createChat(data:ICreateChat) {
        return this.http.post(`${url}/chats`, { data });
    }

    async deleteChat(data:ICreateChat) {
        return this.http.delete(`${url}/chats`, { data });
    }

    addUsers(data: IAddUsersInChat) {
        return this.http.put(`${url}/chats/users`, { data });
    }

    async deleteUsers(data: IAddUsersInChat) {
        return this.http.delete(`${url}/chats/users`, { data });
    }

    async getChatToken(data: number) {
        return (await this.http.post(`${url}/chats/token/${data}`) as any).token;
    }

    async uploadAvatar(data: FormData) {
        return this.http.put(`${url}/chats/avatar`, { data });
    }
}
export default ChatAPI;
