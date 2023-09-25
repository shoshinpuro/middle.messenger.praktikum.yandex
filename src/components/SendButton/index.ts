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

    render() {
        return this.compile(template, this.props);
    }
}

export default SendButton;
