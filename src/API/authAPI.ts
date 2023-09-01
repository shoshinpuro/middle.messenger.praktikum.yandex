import HTTPTransport from '../core/Fetch';
import url, { TUser } from './baseAPI';

class AuthAPI {
    http: HTTPTransport;
    constructor() {
        this.http = new HTTPTransport();
    }

    signIn(data: TUser) {
        return this.http.post(url + '/auth/signin', { data });
    }
    signUp(data: TUser) {
        console.log(url);
        
        return this.http.post(url + '/auth/signup', { data });
    }
    getUser() {
        return this.http.get(url +'/auth/user');
    }
    logout() {
        return this.http.post(url + "/auth/logout");
    }
}

export default AuthAPI;
