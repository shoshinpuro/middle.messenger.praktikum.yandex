import Block from '../../core/Block';
import template from './conversationMessages.hbs';
import Image from '../Image';
import imgPhotocamera from '../../assets/img/photocamera.png';

interface ConversationMessagesProps {
    events?: object;
}

class ConversationMessages extends Block {
    constructor(props: ConversationMessagesProps) {
        super(props);
    }

    protected init(): void {
        this.children.imagePhotocamera = new Image({
            class: '.conversation-message__message-content-img',
            src: imgPhotocamera,
            alt: 'photocamera',
        });
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}

export default ConversationMessages;
