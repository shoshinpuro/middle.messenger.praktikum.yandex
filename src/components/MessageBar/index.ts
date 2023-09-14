import Block from '../../core/Block';
import template from './MessageBar.hbs';
import SendButton from '../SendButton';
import messageController from '../../controllers/messageController';
import { validationMessage } from '../../utils/validation';
import Input from '../Input';

interface MessageBarProps {
    chatId?: number
    events?: any
}

class MessageBar extends Block<MessageBarProps> {
    constructor(props: MessageBarProps) {
        super(props);
    }

    init() {
        this.children.sendInput = new Input({
            name: "message",
            value: "",
            placeholder: "Write a message",
            type: "text",
            class: "message-bar__message-input",
            events: {
                input: (evt) => {
                    const input = (evt.target! as HTMLInputElement);
                    const inputVal = input.value;
                    const eventsButton = {
                        click: (evt: PointerEvent) => {
                            evt.preventDefault();
                            messageController.sendMessage(this.props.chatId!, inputVal);
                            input.value = '';
                        },
                    }
                    console.log(inputVal);
                    if (validationMessage(inputVal)) {
                        (this.children.sendButton as Block).setProps({events: eventsButton, disabled: false})
                    } else {
                        (this.children.sendButton as Block).setProps({disabled: true})
                    }
                },
            }
        });
        this.children.sendButton = new SendButton({
            disabled: true
        });
    }

    render() {
        return this.compile(template, this.props); 
    }
}

export default MessageBar;
