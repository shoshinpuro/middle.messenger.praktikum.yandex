import Block from '../../core/Block';
import template from './sendButton.hbs';

interface SendButtonProps {
    disabled?: boolean;
    events?: {
        click: (evt: PointerEvent) => void
    }
}

class SendButton extends Block<SendButtonProps> {
    constructor(props: SendButtonProps) {
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

export default SendButton;
