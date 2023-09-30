import { Block } from '../../core/Block';
import template from './chatOption.hbs';

interface ChatOptionProps {
    text: string;
    events?: {
        click?: (e: PointerEvent) => void;
    };
}

class ChatOption extends Block<ChatOptionProps> {
    constructor(props: ChatOptionProps) {
        super(props);
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}

export default ChatOption;
