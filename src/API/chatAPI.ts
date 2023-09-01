import HTTPTransport from '../core/Fetch';
import url from './baseAPI';
//import { TIndexed } from '../utils/utilFunctions';

class ChatAPI {
    http: HTTPTransport;

    constructor() {
        this.http = new HTTPTransport();
    }

    getChats() {
        return this.http.get(url + '/chats');
    }
}
export default ChatAPI;
