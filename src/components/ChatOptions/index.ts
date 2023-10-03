import { Block } from '../../core/Block';
import { TClickHandler } from '../../utils/types';
import template from './chatOptions.hbs';

interface IChatOptionsProps {
    events?: {
        click?: TClickHandler;
    };
}

class ChatOptions extends Block<IChatOptionsProps> {
    render() {
        return this.compile(template, this.props);
    }
}

export default ChatOptions;
