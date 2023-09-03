import HTTPTransport from '../core/Fetch';
import url,{ TUser } from './baseAPI';

class UserAPI {
    http: HTTPTransport;
    constructor() {
        this.http = new HTTPTransport();
    }
    updateProfile(data: TUser) {
        return this.http.put(url + '/user/profile', { data });
    }
    changePassword(data: {
        oldPassword: string,
        newPassword: string
      }) {
        return this.http.put(url + '/user/password', { data });
    }
    setAvatar(data: any) {
        return this.http.put(url + '/user/profile/avatar',{data});
    }
    getUserByLogin(data: any) {
        return this.http.post(url +"/user/search", {data});
    }
}
export default UserAPI;
