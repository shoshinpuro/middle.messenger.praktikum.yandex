import Block from '../../core/Block'
import template from './input.hbs'

interface InputProps {
    name: string;
    label: string;
    value: string;
    type: string;
    error?: string;
    events?: {
        
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
