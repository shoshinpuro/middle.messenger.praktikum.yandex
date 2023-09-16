import Block from '../../core/Block';
import template from './conversationMessage.hbs';
import { TIndexed } from '../../utils/utilFunctions';
import { IMessage } from '../../utils/interfaces';
import MessageHeader from '../MessageHeader';
import UserController from '../../controllers/userController';
import store from '../../utils/store';
import { IUserWithId } from '../../controllers/chatController';

interface ConversationMessageProps extends IMessage {
    isMine: boolean;
    message_time: string;
    senderId?: number;
    events?: TIndexed
}

class ConversationMessage extends Block<ConversationMessageProps> {
    constructor(props: ConversationMessageProps) {
        super(props);
    }

    protected init(): void {
        UserController.getChatUser({id: this.props.senderId})
        const senderData = store.getState().selectedChatUsers.find((sender: IUserWithId) => sender.id === this.props.senderId);

        this.children.header = new MessageHeader({name: `${senderData.first_name} ${senderData.second_name}`});
    }
    protected convertToObject() {

    }
    render() {
        return this.compile(template, { ...this.props });
    }
}

export default ConversationMessage;