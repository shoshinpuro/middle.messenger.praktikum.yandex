import ChatAPI from "../API/chatAPI";
import UserAPI from "../API/userAPI";
import { ICreateChat } from "../API/chatAPI";
import store from "../utils/store";
import chatWS from '../API/chatWS';
import router from "..";
import { TUser } from "../API/baseAPI";
import { IUserData } from "../utils/interfaces";

class ChatController {
    ChatAPI:ChatAPI;
    UserAPI:UserAPI;
    constructor() {
        this.ChatAPI = new ChatAPI;
        this.UserAPI = new UserAPI;
    }

    async getChats() {
        try {
            const chats = await this.ChatAPI.getChats() as Array<any>;
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
            await this.ChatAPI.createChat(data)
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
            await this.ChatAPI.deleteChat(data)
                .then(() => this.getChats());
        }
        catch (error) {
            console.log(error);
        }

    }
    async addUsersToChat(data: IUserData) {
        try {
            const { logins, chatId } = data;
            const dataUser =  await logins.map((login) => this.UserAPI.getUserByLogin({login: login}));
            const userIds = (dataUser as Array<any>).map((user) => (user[0] as TUser).id!);
            const requestDataUser = {
                "users": userIds,
                chatId
            };
            await this.ChatAPI.addUsers(requestDataUser)
                .then((res) => console.log(res));
            this.getChats();
        }
        catch (error) {
            console.log(error);
        }

    }
    async deleteUsers(data: IUserData) {
        try {
            const { logins, chatId } = data;
            const dataUser =  await logins.map((login) => this.UserAPI.getUserByLogin({login: login}));
            const userIds = (dataUser as Array<any>).map((user) => (user[0] as TUser).id!);
            const requestDataUser = {
                "users": userIds,
                chatId
            };
            await this.ChatAPI.deleteUsers(requestDataUser)
                .then((res) => console.log(res));
            this.getChats();
        }
        catch (error) {
            console.log(error);
        }
    }
    selectChat(id: number | string) {
        store.set('selectedChat', id);
        this.getChats();
      }

}

export default new ChatController();

