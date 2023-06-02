import Block from '../../core/Block'
import template from './input.hbs'

interface InputProps {
    name: string;
    label: string;
    value: string;
    type: string;
    error?: string;
    events: {
        change: (e:any) => void
    }
}

export class Input extends Block {
    constructor(props: InputProps) {
        console.log(props);
        super('div',props);
    }

    render() {
        console.log(this.props);
        return this.compile(template, this.props);
    }
}
