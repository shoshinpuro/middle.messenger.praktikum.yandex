import ChatAPI from "../API/chatAPI";


export type Indexed<T = any> = {
  [key in string]: T;
};
class ChatController {
    ChatAPI:ChatAPI;
    constructor() {
        this.ChatAPI = new ChatAPI;
    }

    async getChats() {
        try {
            await this.ChatAPI.getChats();
        } catch (err: any) {
            console.log(err.reason)
        }
    }

}
export default new ChatController();
