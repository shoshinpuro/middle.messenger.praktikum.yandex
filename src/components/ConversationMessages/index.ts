import Block from '../../core/Block';
import template from './conversationMessages.hbs';
import ChatOptions from '../ChatOptions';
import ChatOptionsMenu from '../ChatOptionsMenu';
import Popup from '../Popup';
import ConversationMessage from '../ConversationMessage';
import MessageBar from '../MessageBar';

import store, { connect } from '../../utils/store';
import { IChat, IMessage } from '../../utils/interfaces';
import { remakeDate } from '../../utils/utilFunctions';
//import Image from '../Image';

interface ConversationMessagesProps {
    messages: Array<IMessage> | []
    chats: Array<IChat> | [];
    userId: number;
    date?: string;
    selectedChat?: number;
}

class ConversationMessagesBase extends Block<ConversationMessagesProps> {
    constructor(props: ConversationMessagesProps) {
        super(props);
    }

    protected init(): void {
        this.children.chatOptions = new ChatOptions ({
            events: {
                click: () => {
                    (this.children.chatOptionsMenu as Block).show();
                }
            }
        });
        this.children.addUserPopup = new Popup({
            header: 'Add user to chat'
        });
        this.children.deleteUserPopup = new Popup({
            header: 'Delete user from chat'
        });
        this.children.deleteChatPopup = new Popup({
            header: 'Delete chat'
        });
        this.children.chatOptionsMenu = new ChatOptionsMenu({
            popups: [
                this.children.addUserPopup,
                this.children.deleteUserPopup,
                this.children.deleteChatPopup,
            ]
        });
        this.children.messages = this.createMessages(this.props.messages, this.props.userId);
        this.children.messageBar = new MessageBar({chatId: this.props.selectedChat});
    }
    protected componentDidUpdate(oldProps: any, newProps: any): boolean {
        this.children.messages = this.createMessages(newProps.messages, newProps.userId);
        this.children.messageBar = new MessageBar({chatId: newProps.selectedChat});
        //this.setProps({...newProps, date: remakeDate((store.getState().messages || {})[store.getState().selectedChatId]
        //  .slice(-1)[0]?.time)})
        return true;
    }
    private createMessages (messages: Array<IMessage>, userId: number) {
        return messages.map((message) => {
            //console.log(userId);
            //console.log(message.user_id);
            const isMine = message.user_id === userId;
            const message_time = remakeDate(message.time)!;
            return new ConversationMessage({...message, isMine, message_time});
        });
    };
    
    
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
    console.log(state.messages);
    console.log((state.messages || {})[selectedChatId].slice(-1));
    return {
      messages: (state.messages || {})[selectedChatId]
        .filter((message: any) => message.type === 'message') || [],
      chats: [...(state.chats || [])],
      selectedChat: state.selectedChat,
      userId: state.user.id,
      date: remakeDate((state.messages || {})[selectedChatId]
        .slice(-1)[0]?.time)
    };
});
  
const ConversationMessages = withSelectedChat(ConversationMessagesBase as any);
export default ConversationMessages;
