import { Block } from '../../core/Block';
import template from './conversationMessages.hbs';
import ChatOptions from '../ChatOptions';
import ChatOptionsMenu from '../ChatOptionsMenu';
import Popup from '../Popup';
import ConversationMessage from '../ConversationMessage';
import MessageBar from '../MessageBar';

import { connect } from '../../utils/storeHOC';
import { IChat, IMessage } from '../../utils/interfaces';
import { remakeDate } from '../../utils/utilFunctions';
import Image from '../Image';
import url from '../../API/baseConstants';

interface ConversationMessagesProps {
    title: string;
    messages: Array<IMessage> | [];
    chats: Array<IChat> | [];
    userId: number;
    avatar?: unknown;
    date?: string;
    selectedChat?: number;
}

class ConversationMessagesBase extends Block<ConversationMessagesProps> {
    constructor(props: ConversationMessagesProps) {
        super(props);
    }

    protected init(): void {
        this.children.addUserPopup = new Popup({
            header: 'Add user to chat',
        });
        this.children.deleteUserPopup = new Popup({
            header: 'Delete user from chat',
        });
        this.children.deleteChatPopup = new Popup({
            header: 'Delete chat',
        });
        this.children.setChatAvatar = new Popup({
            header: 'Set a new chat avatar',
        });
        this.children.chatOptionsMenu = new ChatOptionsMenu({
            popups: [
                this.children.addUserPopup,
                this.children.deleteUserPopup,
                this.children.deleteChatPopup,
                this.children.setChatAvatar,
            ],
        });
        this.children.chatOptions = new ChatOptions({
            events: {
                click: () => {
                    const dropdown = (this.children.chatOptionsMenu as Block);
                    (dropdown.element as HTMLElement)
                        .style.display === 'flex'
                        ? dropdown.hide() : dropdown.show();
                },
            },
        });
        this.children.messages = this.createMessages(this.props.messages, this.props.userId);
        this.children.messageBar = new MessageBar({ chatId: this.props.selectedChat });

        this.children.avatar = new Image({
            src: this.props.avatar as string ? `${url}/resources${this.props.avatar}` : '',
            alt: 'chat photo',
            class: 'chat__avatar-img',
        });
    }

    protected componentDidUpdate(oldProps: unknown, newProps: ConversationMessagesProps): boolean { // eslint-disable-line @typescript-eslint/no-unused-vars, max-len
        console.log(oldProps); // eslint-disable-line no-console
        this.children.messages = this.createMessages(newProps.messages, newProps.userId);
        this.children.messageBar = new MessageBar({ chatId: newProps.selectedChat });
        if (newProps.avatar) {
            this.children.avatar = new Image({
                src: `${url}/resources${newProps.avatar}`,
                alt: 'chat photo',
                class: 'chat__avatar-img',
            });
        }
        return true;
    }

    private createMessages(messages: Array<IMessage>, userId: number) {
        return messages.map((message) => {
            const connected = message.type === 'user connected';
            const messageUserId = message?.user_id;
            const isMine = messageUserId === userId;
            const messageTime = message?.time
                ? remakeDate(message?.time)!
                : (new Date(Date.now())).toString();
            return new ConversationMessage({
                ...message, isMine, messageTime, senderId: messageUserId, connected,
            }) as Block;
        });
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}
const withSelectedChat = connect((state) => {
    const selectedChatId = state.selectedChat;

    if (!selectedChatId) {
        return {
            messages: [],
            chats: [...(state.chats || [])],
            selectedChat: null,
            userId: state.user.id,
        };
    }

    const selectedChatData = state.chats
        .find(({ id }: { id:number }) => id === state.selectedChat);
    return {
        messages: (state.messages || {})[selectedChatId],
        // .filter((message: TIndexed) => (message.type === 'message' || message.type === ) || [],
        chats: [...(state.chats || [])],
        selectedChat: state.selectedChat,
        userId: state.user.id,
        title: selectedChatData.title,
        avatar: selectedChatData.avatar,
        date: remakeDate((state.messages || {})[selectedChatId]
            .slice(-1)[0]?.time),
    };
});

const ConversationMessages = withSelectedChat(ConversationMessagesBase as typeof Block);
export default ConversationMessages;
