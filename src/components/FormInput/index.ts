import { Block } from '../../core/Block';
import template from './formInput.hbs';
import Input from '../Input';
import { TAnyEventHandler, TValidationHandler } from '../../utils/types';

interface IFormInputProps {
    label: string;
    name: string;
    value?: string;
    type: string;
    accept?: string;
    classInput?: string;
    error?: string;
    events?: {
        focus?: TAnyEventHandler;
        blur?: TAnyEventHandler;
    };
    validationHandler?: TValidationHandler;
}

class FormInput extends Block<IFormInputProps> {
    init() {
        this.children.input = new Input({
            type: this.props.type as string,
            name: this.props.name as string,
            value: this.props.value as string,
            class: this.props.classInput as string,
            accept: this.props?.accept as string,
            events: {
                focus: () => {
                    // console.log('focus'); // eslint-disable-line no-console
                },
                blur: () => {
                    const validationFunc = this.props.validationHandler as TValidationHandler;
                    if (this.props.validationHandler) {
                        validationFunc(this, 0);
                    }
                },
            },

        });
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default FormInput;
