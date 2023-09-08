import Block from '../../core/Block';
import template from './input.hbs';

interface InputProps {
    name: string;
    value: string;
    type: string;
    accept?: string;
    class?: string;
    events?: {
        focus?: () => void;
        blur?: () => void;
    }
}

class Input extends Block<InputProps> {
    constructor(props: InputProps) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default Input;
