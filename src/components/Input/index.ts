import Block from '../../core/Block'
import template from './input.hbs'

interface InputProps {
    name: string;
    value: string;
    type: string;
    class: string;
    events?: {
        focus?: () => void;
        blur?: () => void;
    }
}

export class Input extends Block {
    constructor(props: InputProps) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
