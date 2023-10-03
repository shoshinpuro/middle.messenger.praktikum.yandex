import HTTPTransport from '../core/Fetch';
import url, { TUser } from './baseConstants';

class UserAPI {
    http: HTTPTransport;

    constructor() {
        this.http = new HTTPTransport();
    }

    updateProfile(data: TUser) {
        return this.http.put(`${url}/user/profile`, { data });
    }

    changePassword(data: {
        oldPassword: string,
        newPassword: string
    }) {
        return this.http.put(`${url}/user/password`, { data });
    }

    setAvatar(data: FormData) {
        return this.http.put(`${url}/user/profile/avatar`, { data });
    }

    getUserByLogin(data: { login: string }) {
        return this.http.post(`${url}/user/search`, { data });
    }

    getUserById(data: TUser) {
        return this.http.get(`${url}/user/${data.id}`);
    }
}
export default UserAPI;
