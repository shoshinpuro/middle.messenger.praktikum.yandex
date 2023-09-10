import Block from '../../core/Block';
import template from './conversationMessages.hbs';
import ChatOption from '../ChatOption';
import Popup from '../Popup';
import { connect } from '../../utils/store';
//import Image from '../Image';
//import imgPhotocamera from '../../assets/img/photocamera.png';

interface ConversationMessagesProps {
    selectedChat?: number;
}

class ConversationMessagesBase extends Block<ConversationMessagesProps> {
    constructor(props: ConversationMessagesProps) {
        super(props);
    }

    protected init(): void {
        this.children.addUserOption = new ChatOption({
            text: 'Add user',
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    (this.children.addUserPopup as Popup).show();
                },
            }
        }); 
        this.children.deleteUserOption = new ChatOption({
            text: 'Delete user',
            events: {
                click:(evt: PointerEvent) => {
                    evt.preventDefault();
                    (this.children.deleteUserPopup as Popup).show();
                },
            }
        }); 
        this.children.deleteChatOption = new ChatOption({
            text: 'Delete chat',
            events: {
                click:(evt: PointerEvent) => {
                    evt.preventDefault();
                    (this.children.deleteChatPopup as Popup).show();
                },
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
        /*this.children.conversationMessage = new ConversationMessage({
            class: '.conversation-message__message-content-img',
            src: imgPhotocamera,
            alt: 'photocamera',
        });*/
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
  
    return {
      messages: (state.messages || {})[selectedChatId] || [],
      chats: [...(state.chats || [])],
      selectedChat: state.selectedChat,
      userId: state.user.id,
    };
  });
  
const ConversationMessages = withSelectedChat(ConversationMessagesBase as any);
export default ConversationMessages;
