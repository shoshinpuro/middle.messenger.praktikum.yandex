import { Block } from '../../core/Block';
import template from './messageHeader.hbs';

interface IMessageHeaderProps {
    name?: string;
}

export default class MessageHeader extends Block<IMessageHeaderProps> {
    render() {
        return this.compile(template, this.props);
    }
}
