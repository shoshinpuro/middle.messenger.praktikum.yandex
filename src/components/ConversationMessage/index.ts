import { Block } from '../../core/Block';
import template from './ConversationMessage.hbs';
import { TIndexed } from '../../utils/types';
import { IMessage } from '../../utils/interfaces';
import MessageHeader from '../MessageHeader';
import UserController from '../../controllers/userController';
import store from '../../utils/storeHOC';
import { IUserWithId } from '../../controllers/chatController';

interface IConversationMessageProps extends IMessage {
    isMine: boolean;
    messageTime: string;
    connected?: boolean;
    senderId?: number;
    events?: TIndexed;
}

class ConversationMessage extends Block<IConversationMessageProps> {
    protected init(): void {
        if (this.props.senderId && !this.props.isMine) {
            UserController.getChatUser({ id: this.props.senderId });
            const senderData = store.getState().selectedChatUsers
                ?.find((sender: IUserWithId) => sender.id === this.props.senderId);

            this.children.header = new MessageHeader({
                name: `${senderData.first_name} ${senderData.second_name}`,
            });
        }
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}

export default ConversationMessage;
