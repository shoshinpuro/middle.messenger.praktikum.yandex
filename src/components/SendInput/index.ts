import Block from '../../core/Block';
import template from './sendInput.hbs';

interface SendInputProps {
    events?: {
        focus?: () => void;
        blur?: () => void;
        input?: () => void
    }
}

class SendInput extends Block<SendInputProps> {
    constructor(props: SendInputProps) {
        super(props);
    }

    init() {
        /*this.children.addUserOption = new ChatOption({
            text: 'Add user',
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    (this.children.addUserPopup as Block).show();
                },
            }
        });*/
    }

    render() {
        return this.compile(template, this.props); 
    }
}

export default SendInput;
