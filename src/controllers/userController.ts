import UserAPI from '../API/userAPI';
import { TUser } from '../API/baseConstants';
import router, { Routes } from '../index';
import AuthController from './authController';
import store from '../utils/storeHOC';

class UserController {
    UserAPI: UserAPI;

    constructor() {
        this.UserAPI = new UserAPI();
    }

    async updateProfile(data: TUser) {
        try {
            await this.UserAPI.updateProfile(data)
                .then(() => AuthController.getUser())
                .then(() => router.go(Routes.ProfilePreferences));
        } catch (error) {
            console.log(error); // eslint-disable-line no-console
        }
    }

    async changePassword(data: {
        oldPassword: string,
        newPassword: string
    }) {
        try {
            await this.UserAPI.changePassword(data)
                .then(() => router.go(Routes.ProfilePreferences));
        } catch (error) {
            console.log(error); // eslint-disable-line no-console
        }
    }

    async setAvatar(data: any) {
        try {
            await this.UserAPI.setAvatar(data)
                .then(() => AuthController.getUser());
            store.on('updated', () => { console.log('update avatar'); }); // eslint-disable-line no-console, max-len
        } catch (error) {
            console.log(error); // eslint-disable-line no-console
        }
    }

    async getChatUser(data: TUser) {
        try {
            const oldChatData = store.getState().selectedChatUsers ?? [];
            await this.UserAPI.getUserById(data)
                .then((res) => store.set('selectedChatUsers', oldChatData.concat([res])));
        } catch (error) {
            console.log(error); // eslint-disable-line no-console
        }
    }
}
export default new UserController();
