import Block from '../../core/Block';
import template from './chatOptionsMenu.hbs';
import ChatOption from '../ChatOption';

interface ChatOptionsMenuProps {
    popups: Block[];
    events?: any
}

class ChatOptionsMenu extends Block<ChatOptionsMenuProps> {
    constructor(props: ChatOptionsMenuProps) {
        super(props);
    }

    init() {
        this.children.addUserOption = new ChatOption({
            text: 'Add user',
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    this.hide();
                    this.props.popups[0].show();
                },
            },
        });
        this.children.deleteUserOption = new ChatOption({
            text: 'Delete user',
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    this.hide();
                    this.props.popups[1].show();
                },
            },
        });
        this.children.deleteChatOption = new ChatOption({
            text: 'Delete chat',
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    this.hide();
                    this.props.popups[2].show();
                },
            },
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default ChatOptionsMenu;
