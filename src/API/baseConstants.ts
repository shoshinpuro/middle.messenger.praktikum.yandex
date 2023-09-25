export type TUser = {
    id?: number,
    first_name?:string,
    second_name?: string,
    display_name?: string,
    phone?: string,
    login?: string,
    avatar?: string,
    email?: string,
    password?: string,
};

export const urlWS = 'https://ya-praktikum.tech/WS/chats';

const url = 'https://ya-praktikum.tech/api/v2';
export default url;
