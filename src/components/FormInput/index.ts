import Block from '../../core/Block'
import template from './formInput.hbs'
import { Input } from '../Input';

interface InputProps {
    name: string;
    label: string;
    value: string;
    type: string;
    classInput?: string;
    error?: string;
    events?: {
        
    };
    validationHandler?: (elem: Block, childNum: number) => (string | undefined);
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
            class: this.props.classInput,
            events: {
                focus: () => {
                    console.log('focus');
                },
                blur: () => {
                    console.log("this")
                    console.log(this)
                    this.props.validationHandler(this, 0)
                }
            },
            
        })
    }

    render() {
        return this.compile(template, this.props);
    }
}
