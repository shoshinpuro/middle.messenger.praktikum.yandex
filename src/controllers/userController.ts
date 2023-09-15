import UserAPI from '../API/userAPI';
import { TUser } from '../API/baseAPI';
import router from '../index';
import AuthController from './authController';
import store from '../utils/store';

class UserController {
    UserAPI: UserAPI;
    constructor() {
        this.UserAPI = new UserAPI;
    }
    async updateProfile(data: TUser) {
        try {
            await this.UserAPI.updateProfile(data)
                .then(() => AuthController.getUser())
                .then(() => router.go("/settings"));
        }
        catch (error) {
            console.log(error);
        }

    }
    async changePassword(data: {
        oldPassword: string,
        newPassword: string
      }) {
        try {
            await this.UserAPI.changePassword(data)
                .then(() => router.go("/settings"));
        }
        catch (error) {
            console.log(error);
        }

    }
    async setAvatar(data: any) {
        try {
            await this.UserAPI.setAvatar(data)
                .then(() => AuthController.getUser());
            store.on('updated', () => {console.log('update');});
        }
        catch (error) {
            console.log(error);
        }
    }
    async getChatUser(data: TUser) {
        try {
            const oldChatData = store.getState()['selectedChatUsers'] ?? [];
            console.log(oldChatData)
            await this.UserAPI.getUserById(data)
                .then((res) => store.set('selectedChatUsers', oldChatData.concat([res])));
        }
        catch (error) {
            console.log(error);
        }

    }
}
export default new UserController();
