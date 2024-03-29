import { Block } from '../../core/Block';
import template from './MessageBar.hbs';
import SendButton from '../SendButton';
import messageController from '../../controllers/messageController';
import { validationMessage } from '../../utils/validation';
import Input from '../Input';
import { TIndexed } from '../../utils/types';

interface IMessageBarProps {
    chatId?: number;
    events?: TIndexed;
}

class MessageBar extends Block<IMessageBarProps> {
    init() {
        this.children.sendInput = new Input({
            name: 'message',
            value: '',
            placeholder: 'Write a message',
            type: 'text',
            class: 'message-bar__message-input',
            events: {
                input: (evt) => {
                    const input = (evt.target! as HTMLInputElement);
                    const inputVal = input.value;
                    const eventsButton = {
                        click: (e: PointerEvent) => {
                            e.preventDefault();
                            messageController.sendMessage(this.props.chatId!, inputVal);
                            input.value = '';
                        },
                    };
                    if (validationMessage(inputVal)) {
                        (this.children.sendButton as Block)
                            .setProps({ events: eventsButton, disabled: false });
                    } else {
                        (this.children.sendButton as Block).setProps({ disabled: true });
                    }
                },
            },
        });
        this.children.sendButton = new SendButton({
            disabled: true,
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default MessageBar;
