import ChatAPI, { ICreateChat } from '../API/chatAPI';
import UserAPI from '../API/userAPI';

import store from '../utils/storeHOC';
import messageController from './messageController';
import { IUser, IUserData } from '../utils/interfaces';
import { TIndexed } from '../utils/types';

export interface IUserWithId extends IUser {
    id?: number;
}

class ChatController {
    ChatAPI:ChatAPI;

    UserAPI:UserAPI;

    constructor() {
        this.ChatAPI = new ChatAPI();
        this.UserAPI = new UserAPI();
    }

    async getChats(again: boolean = false) {
        try {
            const chats = await this.ChatAPI.getChats() as Array<TIndexed>;
            if (chats) {
                if (!again) {
                    chats.map(async (chat) => {
                        const token = await this.getToken(chat.id);
                        await messageController.connect(chat.id, token);
                    });
                }
                store.set('chats', chats);
                store.on('updated', () => {
                    console.log('updated chats'); // eslint-disable-line no-console
                });
            }
        } catch (error) {
            console.log(error); // eslint-disable-line no-console
        }
    }

    async createChat(data: ICreateChat) {
        try {
            await this.ChatAPI.createChat(data)
                .then(() => this.getChats());
        } catch (error) {
            console.log(error); // eslint-disable-line no-console
        }
    }

    async deleteChat(id: number) {
        try {
            const data = { chatId: id };
            store.set('selectedChat', '');
            await this.ChatAPI.deleteChat(data)
                .then(() => this.getChats(true));
        } catch (error) {
            console.log(error); // eslint-disable-line no-console
        }
    }

    async addUsersToChat(data: IUserData) {
        try {
            const { logins, chatId } = data;
            const dataUser: Array<IUserWithId> = await this.UserAPI
                .getUserByLogin({ login: logins[0] }) as Array<IUserWithId>;

            const requestDataUser = {
                users: [
                    dataUser.slice(-1)[0].id!,
                ],
                chatId,
            };
            await this.ChatAPI.addUsers(requestDataUser);
            this.getChats();
        } catch (error) {
            console.log(error); // eslint-disable-line no-console
            alert(`User wasn't added: ${error}`); // eslint-disable-line no-alert
        }
    }

    async deleteUsersFromChat(data: IUserData) {
        try {
            const { logins, chatId } = data;
            const dataUser: Array<IUserWithId> = await this
                .UserAPI.getUserByLogin({ login: logins[0] }) as Array<IUserWithId>;
            const requestDataUser = {
                users: [
                    dataUser.slice(-1)[0].id!,
                ],
                chatId,
            };
            await this.ChatAPI.deleteUsers(requestDataUser);
            this.getChats();
        } catch (error) {
            console.log(error); // eslint-disable-line no-console
            alert(`User wasn't deleted: ${error}`); // eslint-disable-line no-alert
        }
    }

    async uploadAvatarChat(data: FormData) {
        await this.ChatAPI.uploadAvatar(data);
        this.getChats(true);
    }

    selectChat(id: number | string) {
        store.set('selectedChat', id);
        this.getChats();
    }

    getToken(id: number) {
        return this.ChatAPI.getChatToken(id);
    }
}

export default new ChatController();
