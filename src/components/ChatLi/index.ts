import { Block } from '../../core/Block';
import template from './chatLi.hbs';
import Image from '../Image';
import url, { TUser } from '../../API/baseConstants';
import { connect } from '../../utils/storeHOC';
import { remakeDate } from '../../utils/utilFunctions';

type TlastMessage = {
    content: string,
    id: number,
    time: string,
    user: TUser
};
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

    protected init(): void {
        this.children.avatar = new Image({
            src: this.props.avatar as string ? `${url}/resources${this.props.avatar}` : '',
            alt: 'chat photo',
            class: 'chat__avatar-img',
        });
    }

    render() {
        const lastMessage = { ...this.props.last_message };
        const lastMessageUser = { ...lastMessage?.user };
        const time = lastMessage ? remakeDate(lastMessage.time as string) : undefined;
        // console.log({...this.props, ...this.props.last_message, ...this.props.last_message});
        const newProps = {
            ...this.props,
            ...lastMessage,
            ...lastMessageUser,
        };
        newProps.time = time;
        return this.compile(template, newProps);
    }
}
const withSelectedChat = connect((state) => ({
    selectedChat: (state.chats || []).find(({ id }: { id:number }) => id === state.selectedChat),
}));

const ChatLi = withSelectedChat(Chat as any);
export default ChatLi;
