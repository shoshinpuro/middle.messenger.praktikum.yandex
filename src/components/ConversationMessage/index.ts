import Block from '../../core/Block';
import template from './conversationMessage.hbs';
import { TIndexed } from '../../utils/utilFunctions';
import Image from '../Image';
import imgPhotocamera from '../../assets/img/photocamera.png';

interface ConversationMessageProps {
    events?: TIndexed
}

class ConversationMessage extends Block<ConversationMessageProps> {
    constructor(props: ConversationMessageProps) {
        super(props);
    }

    protected init(): void {
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}

export default ConversationMessage;
