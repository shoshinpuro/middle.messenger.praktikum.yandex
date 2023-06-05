import Block from '../../core/Block';
import template from './dataUnitLi.hbs';
import Input from '../Input';

interface DataUnitLiProps {
    header: string;
    textValue: string;
    isEdit?: boolean;
    name?: string;
    type?: string;
    error?: string;
    events?: object;
    validationHandler?: (elem: Block, childNum: number) => (string | undefined);
}

class DataUnitLi extends Block {
    constructor(props: DataUnitLiProps) {
        super(props);
    }

    init() {
        if (this.props.isEdit) {
            const dataUnitLiInputClass = 'profile-data-form__input  form-input';
            this.children.input = new Input({
                name: this.props.name,
                value: this.props.textValue,
                type: this.props.type,
                class: dataUnitLiInputClass,
                events: {
                    focus: () => {
                        console.log('focus'); // eslint-disable-line no-console
                    },
                    blur: () => {
                        this.props.validationHandler(this, 1);
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
