import { Block } from '../../core/Block';
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

    render() {
        return this.compile(template, this.props);
    }
}

export default SendInput;
