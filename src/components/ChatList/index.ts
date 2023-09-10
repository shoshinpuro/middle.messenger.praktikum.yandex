import Block from '../../core/Block';
import template from './chatList.hbs';
import ChatLi from '../ChatLi';
import { ChatLiProps } from '../ChatLi';
import { connect } from '../../utils/store';
import ChatController from '../../controllers/chatController';

interface ChatListProps {
  chats?: Block[];
  isLoaded?: boolean;
}

export class ChatsListBase extends Block<ChatListProps> {
  constructor(props: ChatListProps) {
    super({ ...props });
  }

  protected init() {
    this.children.chats = this.createChats(this.props); 
  }

  private createChats(props: ChatListProps) {
    return (props.chats as unknown as Array<ChatLiProps>).map((data) => {
      return new ChatLi({
        ...data,
        events: {
          click: (evt: PointerEvent) => {
            evt.preventDefault();
            ChatController.selectChat(data.id!)
          },
        },
      });
    });
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

const ChatList = withChats(ChatsListBase as any);
export default ChatList;
