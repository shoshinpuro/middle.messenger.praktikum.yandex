import AuthAPI from '../API/authAPI';
import { TUser } from '../API/baseConstants';
import store from '../utils/storeHOC';
import router, { Routes } from '../index';
import messageController from './messageController';
import { TIndexed } from '../utils/types';

class AuthController {
    AuthAPI:AuthAPI;

    constructor() {
        this.AuthAPI = new AuthAPI();
    }

    async signIn(data: TUser) {
        try {
            await this.AuthAPI.signIn(data)
                .then(() => this.getUser())
                .then(() => router.go(Routes.Chats))
                .catch((err) => {
                    throw err;
                    console.log(err); // eslint-disable-line no-console
                });
        } catch (error) {
            console.log(error); // eslint-disable-line no-console
            if ((error as TIndexed)?.reason === 'User already in system') {
                await this.getUser()
                    .then(() => router.go(Routes.Chats));
            }
        }
    }

    async signUp(data: TUser) {
        try {
            await this.AuthAPI.signUp(data);
        } catch (error) {
            console.log(error); // eslint-disable-line no-console
        }
    }

    async getUser() {
        try {
            store.on('updated', () => { console.log('update user'); }); // eslint-disable-line no-console, max-len
            await this.AuthAPI.getUser()
                .then((res) => store.set('user', res));
            store.on('updated', () => { console.log('update user'); }); // eslint-disable-line no-console, max-len
        } catch (error) {
            console.log(error); // eslint-disable-line no-console
        }
    }

    async logout() {
        try {
            messageController.closeAll();
            store.resetState();
            await this.AuthAPI.logout()
                .then(() => router.go(Routes.Login));
        } catch (error) {
            console.log(error); // eslint-disable-line no-console
        }
    }
}
export default new AuthController();
