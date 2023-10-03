import { Block } from '../../core/Block';
import { TClickHandler } from '../../utils/types';
import template from './formButton.hbs';

interface IButtonProps {
    label: string;
    class: string;
    type: string;
    events: {
        click: TClickHandler;
    };
}

class FormButton extends Block<IButtonProps> {
    render() {
        return this.compile(template, this.props);
    }
}

export default FormButton;
