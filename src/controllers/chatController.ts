import ChatAPI, { ICreateChat } from '../API/chatAPI';
import UserAPI from '../API/userAPI';

import store from '../utils/storeHOC';
import messageController from './messageController';
import router, { Routes } from '..';
import { IUser, IUserData } from '../utils/interfaces';

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

    async getChats() {
        try {
            const chats = await this.ChatAPI.getChats() as Array<any>;
            // console.log(chats);
            // await chats.sort();
            chats.map(async (chat) => {
                const token = await this.getToken(chat.id);
                await messageController.connect(chat.id, token);
            });
            store.set('chats', chats);
            store.on('updated', () => {
                console.log('updated chats'); // eslint-disable-line no-console
            });
        } catch (error) {
            console.log(error); // eslint-disable-line no-console
        }
    }

    async createChat(data: ICreateChat) {
        try {
            await this.ChatAPI.createChat(data)
                // .then((res) => console.log(res))
                .then(() => this.getChats())
                .then(() => router.go(Routes.Chats));
        } catch (error) {
            console.log(error); // eslint-disable-line no-console
        }
    }

    async deleteChat(id: number) {
        try {
            const data = { chatId: id };
            await this.ChatAPI.deleteChat(data)
                .then(() => this.getChats());
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
            await this.ChatAPI.deleteUsers(requestDataUser);
            // .then((res) => console.log(res));
            this.getChats();
            /* let userDataArr: Array<IUserWithId> = [];

            dataUsers.forEach( async (dataUser, i) =>{
                const foundUsers = (await dataUser) as Array<IUserWithId>;
                const expectedUser = foundUsers
                    .find((user: IUserWithId) => user.login === logins[i])!;
                userDataArr.push(expectedUser);
            });

            const storeDataUsers = store.getState()?.contactedUsers || [];
            store.set('contactedUsers', storeDataUsers.concat(userDataArr));

            const requestDataUser = {
                "users": loginsToIds(logins),
                chatId
            }; */

            /* await this.ChatAPI.addUsers(requestDataUser)
                .then((res) => console.log(res));
            this.getChats(); */
        } catch (error) {
            console.log(error); // eslint-disable-line no-console
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
            await this.ChatAPI.addUsers(requestDataUser);
            // .then((res) => console.log(res));
            this.getChats();
            /* let userIdArr: Array<number> = [];
            const dataUsers =  await logins.map(async (login) => {
                let result = await this.UserAPI.getUserByLogin({login: login});
                console.log(result);
                //alert(result);
                return result;
            })
            console.log(dataUsers[0]);
            alert(dataUsers[0]);
            await dataUsers.forEach( async (dataUser, i) =>{
                const foundUsers = (await dataUser) as Array<IUserWithId>;
                const expectedUser = foundUsers
                    .find((user: IUserWithId) => user.login === logins[i])!.id;
                userIdArr.push(expectedUser);
            });
            const requestDataUser = {
                "users": userIdArr,
                chatId
            };
            console.log(requestDataUser);
            await this.ChatAPI.deleteUsers(requestDataUser)
                .then((res) => console.log(res));
            this.getChats(); */

            /* const storeDataUsers: Array<IUserWithId> = store.getState()?.contactedUsers || [];
            const indexes: number[] = [];
            const ids: number[] = [];
            logins.forEach((login) =>{
                const i = storeDataUsers.findIndex((user: IUserWithId) => user.login === login);
                indexes.push(i);
                ids.push(storeDataUsers[i].id)
            });
            indexes.forEach(index => delete storeDataUsers[index]);
            const newStoreDataUsers = indexes.filter(Boolean);
            store.set('contactedUsers', newStoreDataUsers); */
            /* const dataUser =  await logins.map((login) => this.UserAPI
                .getUserByLogin({login: login}));
            const userIds = (dataUser as Array<any>).map((user) => (user[0] as TUser).id!); */
        } catch (error) {
            console.log(error); // eslint-disable-line no-console
        }
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
