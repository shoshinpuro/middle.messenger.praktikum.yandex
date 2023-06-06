import Block from '../../core/Block';
import template from './formInput.hbs';
import Input from '../Input';

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

type ValidationHandler = (elem: Block, childNum: number) => string;

class FormInput extends Block {
    constructor(props: InputProps) {
        super(props);
    }

    init() {
        this.children.input = new Input({
            type: this.props.type as string,
            name: this.props.name as string,
            value: this.props.value as string,
            class: this.props.classInput as string,
            events: {
                focus: () => {
                    console.log('focus'); // eslint-disable-line no-console
                },
                blur: () => {
                    const validationFunc = this.props.validationHandler as ValidationHandler;
                    validationFunc(this, 0);
                },
            },

        });
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default FormInput;
