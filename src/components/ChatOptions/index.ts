import Block from '../../core/Block';
import template from './chatOptions.hbs';

interface ChatOptionsProps {
    events?: {
        click?: (e?:MouseEvent) => void;
    }
}

class ChatOptions extends Block<ChatOptionsProps> {
    constructor(props: ChatOptionsProps) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default ChatOptions;
