import { Block } from '../../core/Block';
import { TClickHandler } from '../../utils/types';
import template from './sendButton.hbs';

interface ISendButtonProps {
    disabled?: boolean;
    events?: {
        click: TClickHandler;
    };
}

class SendButton extends Block<ISendButtonProps> {
    render() {
        return this.compile(template, this.props);
    }
}

export default SendButton;
