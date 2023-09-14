import Block from "../core/Block";

export interface PopupFillProps {
    popupHandler?: () => void;
    error?: string;
    selectedChat?: number;
    events?: {};
}
export interface IUserData {
    logins: Array<string>,
    chatId: number
}
export interface IMessage {
    chat_id: number;
    content: string;
    file?: {
      id: number;
      user_id: number;
      path: string;
      filename: string;
      content_type: string;
      content_size: number;
      upload_date: string;
    };
    id: number;
    is_read: boolean;
    time: string;
    type: string;
    user_id: number;
}
export interface IUser {
  avatar?: string;
  display_name: string;
  first_name: string;
  login: string;
  second_name: string;
}
export interface IChat {
  avatar?: string;
  created_by: number;
  id: number;
  last_message?: {
    content: string;
    id: number;
    time: string;
    user: IUser
  }
  title: string;
  unread_count: number;
}
