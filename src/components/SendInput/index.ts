import { Block } from '../../core/Block';
import { TAnyEventHandler } from '../../utils/types';
import template from './sendInput.hbs';

interface ISendInputProps {
    events?: {
        focus?: TAnyEventHandler;
        blur?: TAnyEventHandler;
        input?: TAnyEventHandler;
    };
}

class SendInput extends Block<ISendInputProps> {
    render() {
        return this.compile(template, this.props);
    }
}

export default SendInput;
