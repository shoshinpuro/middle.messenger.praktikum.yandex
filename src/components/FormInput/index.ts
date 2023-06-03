import Block from '../../core/Block'
import template from './formInput.hbs'
import { Input } from '../Input';

interface InputProps {
    name: string;
    label: string;
    value: string;
    type: string;
    error?: string;
    events?: {
        
    };
    validationHandler?: (elem: Block) => (string | undefined);
}

export class FormInput extends Block {
    constructor(props: InputProps) {
        super(props);
    }

    init() {
        this.children.input = new Input ({
            type: this.props.type,
            name: this.props.name,
            value: this.props.value,
            events: {
                focus: () => {
                    console.log('focus');
                },
                blur: () => {
                    this.props.validationHandler(this)
                }
            },
            
        })
    }

    render() {
        return this.compile(template, this.props);
    }
}
