import { Block } from '../../core/Block';
import template from './dataUnitLi.hbs';
import Input from '../Input';
import { TIndexed, TValidationHandler } from '../../utils/types';

interface IDataUnitLiProps {
    header: string;
    textValue: string;
    isEdit?: boolean;
    name?: string;
    type?: string;
    error?: string;
    events?: TIndexed;
    validationHandler?: TValidationHandler;
}

class DataUnitLi extends Block<IDataUnitLiProps> {
    init() {
        // console.log(this.props);
        if (this.props.isEdit) {
            const dataUnitLiInputClass = 'profile-data-form__input  form-input';
            this.children.input = new Input({
                name: this.props.name as string,
                value: this.props.textValue as string,
                type: this.props.type as string,
                class: dataUnitLiInputClass,
                events: {
                    focus: () => {
                        console.log('focus'); // eslint-disable-line no-console
                    },
                    blur: () => {
                        const validationFunc = this.props.validationHandler as TValidationHandler;
                        validationFunc(this, 1);
                    },
                },
            });
        }
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}

export default DataUnitLi;
