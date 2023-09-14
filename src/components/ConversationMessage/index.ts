import Block from '../../core/Block';
import template from './conversationMessage.hbs';
import { TIndexed } from '../../utils/utilFunctions';
import { IMessage } from '../../utils/interfaces';

interface ConversationMessageProps extends IMessage {
    isMine: boolean;
    message_time: string;
    events?: TIndexed
}

class ConversationMessage extends Block<ConversationMessageProps> {
    constructor(props: ConversationMessageProps) {
        super(props);
    }

    protected init(): void {
    }
    protected convertToObject() {

    }
    render() {
        return this.compile(template, { ...this.props });
    }
}

export default ConversationMessage;
