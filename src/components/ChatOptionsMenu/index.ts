import { Block } from '../../core/Block';
import template from './chatOptionsMenu.hbs';
import ChatOption from '../ChatOption';
import { TIndexed } from '../../utils/types';

interface IChatOptionsMenuProps {
    popupsAndOptNames: Array<[Block, string]>;
    events?: TIndexed;
}

class ChatOptionsMenu extends Block<IChatOptionsMenuProps> {
    init() {
        this.children.options = this.createChatOptions(this.props.popupsAndOptNames);
    }

    private createChatOptions(popups: Array<[Block, string]>) {
        return popups.map((popup) => new ChatOption({
            text: popup[1],
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    this.hide();
                    popup[0].show();
                },
            },
        }) as Block);
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default ChatOptionsMenu;
