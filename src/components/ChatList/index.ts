import { Block } from '../../core/Block';
import template from './chatList.hbs';
import ChatLi, { IChatLiProps } from '../ChatLi';

import { connect } from '../../utils/storeHOC';
import ChatController from '../../controllers/chatController';

interface IChatListProps {
    chats?: Block[];
}

export class ChatsListBase extends Block<IChatListProps> {
    protected init() {
        this.children.chats = this.createChats(this.props);
    }

    private createChats(props: IChatListProps) {
        return (props.chats as unknown as Array<IChatLiProps>).map((data) => new ChatLi({
            ...data,
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    ChatController.selectChat(data.id!);
                },
            },
        }));
    }

    componentDidUpdate(oldProps: unknown, newProps: IChatListProps): boolean { // eslint-disable-line @typescript-eslint/no-unused-vars, max-len
        console.log(oldProps); // eslint-disable-line no-console
        this.children.chats = this.createChats(newProps);
        return true;
    }

    render(): DocumentFragment {
        return this.compile(template, {
            ...this.props,
        });
    }
}

const withChats = connect((state) => {
    const selectedChatId = state.selectedChat;

    if (!selectedChatId) {
        return {
            messages: [],
            chats: [...(state.chats || [])],
        };
    }

    return {
        messages: (state.messages || {})[selectedChatId] || [],
        chats: [...(state.chats || [])],
    };
});

const ChatList = withChats(ChatsListBase as typeof Block);
export default ChatList;
