import ChatAPI from "../API/chatAPI";
import UserAPI from "../API/userAPI";
import { ICreateChat, IAddUsersInChat } from "../API/chatAPI";
import store from "../utils/store";
import chatWS from '../API/chatWS';
import router from "..";

class ChatController {
    ChatsAPI:ChatAPI;
    UserAPI:UserAPI;
    constructor() {
        this.ChatsAPI = new ChatAPI;
        this.UserAPI = new UserAPI;
    }

    async getChats() {
        try {
            const chats = await this.ChatsAPI.getChats() as Array<any>;
            chats.sort();
            console.log(chats);
            store.set('chats', chats);
            store.on('updated', () => {
                console.log('updated');
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async createChat(data: ICreateChat) {
        try {
            await this.ChatsAPI.createChat(data)
                .then((res) => console.log(res))
                .then(() => this.getChats())
                .then(() => router.go('/messenger'));
        }
        catch (error) {
            console.log(error);
        }
    }
    async deleteChat(data: ICreateChat) {
        try {
            data = {chatId: data};
            await this.ChatsAPI.deleteChat(data)
                .then(() => this.getChats());
        }
        catch (error) {
            console.log(error);
        }

    }
    async addUsersToChat(data: any) {
        try {
            const { login, chatId } = data;
            const dataUser = await this.UserAPI.getUserByLogin({login: login}) as Array<any>;
            const requestDataUser = {
                "users": [
                    dataUser[0].id
                ],
                chatId
            };
            await this.ChatsAPI.addUsers(requestDataUser)
                .then((res) => console.log(res));
            this.getChats();
        }
        catch (error) {
            console.log(error);
        }

    }
    async deleteUsers(data: IAddUsersInChat) {
        try {
            const { users, chatId } = data;
            const dataUser = await this.UserAPI.getUserByLogin({login: users}) as Array<any>;
            const requestDataUser = {
                "users": [
                    dataUser[0].id
                ],
                chatId
            };
            await this.ChatsAPI.deleteUsers(requestDataUser)
                .then((res) => console.log(res));
            this.getChats();
        }
        catch (error) {
            console.log(error);
        }

    }

}

export default new ChatController();

