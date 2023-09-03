import AuthAPI from '../API/authAPI';
import { TUser } from '../API/baseAPI';
import store from '../utils/store';
import router from '../index';

class AuthController {
    AuthAPI:AuthAPI;
    constructor() {
        this.AuthAPI = new AuthAPI;
    }
    async signIn(data: TUser) {
        try {
            await this.AuthAPI.signIn(data)
                .then(() => this.getUser())
                .then(() => router.go("/messenger"))
                .catch(function (err) {
                    throw err;
                    console.log(err); 
                });
        }
        catch (error) {
            console.log(error);
            if ((error as any)?.reason === 'User already in system') {
                console.log('catch user in system error')
                await this.getUser()
                .then(() => router.go("/messenger"))
            }
        }
    }
    async signUp(data: TUser) {
        try {
            console.log(data);
            await this.AuthAPI.signUp(data);
        }
        catch (error) {
            console.log(error);
        }

    }
    async getUser() {
        try {
            await this.AuthAPI.getUser()
                .then((res) => store.set('user', res));
            store.on('updated', () => {console.log('update');});
        }
        catch (error) {
            console.log(error);
        }
    }

    async logout() {
        try {
            await this.AuthAPI.logout()
                .then(() => router.go("/"));
        }
        catch (error) {
            console.log(error);
        }
    }
}
export default new AuthController();
