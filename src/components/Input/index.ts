import { Block } from '../../core/Block';
import { TAnyEventHandler } from '../../utils/types';
import template from './input.hbs';

interface IInputProps {
    name: string;
    value: string;
    type: string;
    accept?: string;
    class?: string;
    placeholder?: string;
    events?: {
        focus?: TAnyEventHandler;
        blur?: TAnyEventHandler;
        input?: TAnyEventHandler;
    };
}

class Input extends Block<IInputProps> {
    render() {
        return this.compile(template, this.props);
    }
}

export default Input;
