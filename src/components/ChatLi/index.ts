import Block from '../../core/Block';
import template from './chatLi.hbs';
//import Image from '../Image';
import { TUser } from '../../API/baseAPI';
import { connect } from '../../utils/store';
import { remakeDate } from '../../utils/utilFunctions';

type TlastMessage = {
    content: string,
    id: number,
    time: string,
    user: TUser
}
export interface ChatLiProps {
    link: string;
    title: string;
    last_message?: TlastMessage | null;
    unread_count?: number;
    avatar?: any;
    created_by?: number;
    id?: number;
    time?: string;
    events?: {};
}

class Chat extends Block<ChatLiProps> {
    constructor(props: ChatLiProps) {
        super(props);
    }

    init() {
        
    }

    render() {
        const lastMessage = {...this.props.last_message}
        const lastMessageUser = {...lastMessage?.user}
        let time = lastMessage?remakeDate(lastMessage.time as string): undefined;
        //console.log({...this.props, ...this.props.last_message, ...this.props.last_message});
        const newProps = { 
            ...this.props,
            ...lastMessage,
            ...lastMessageUser
        }
        newProps.time = time;
        return this.compile(template, newProps); 
    }
}
const withSelectedChat = connect((state) => ({
    selectedChat: (state.chats || []).find(({ id }: {id:number}) => id === state.selectedChat),
}));
  
const ChatLi = withSelectedChat(Chat as any);
export default ChatLi;
