import { Block } from '../../core/Block';
import { TClickHandler } from '../../utils/types';
import template from './chatOption.hbs';

interface IChatOptionProps {
    text: string;
    events?: {
        click?: TClickHandler;
    };
}

class ChatOption extends Block<IChatOptionProps> {
    render() {
        return this.compile(template, { ...this.props });
    }
}

export default ChatOption;
