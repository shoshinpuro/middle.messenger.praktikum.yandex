import { Block } from '../../core/Block';
import template from './messageHeader.hbs';

interface MessageHeaderProps {
    name?: string;
}

export default class MessageHeader extends Block<MessageHeaderProps> {
    constructor(props: MessageHeaderProps) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
