import Block from '../../core/Block';
import template from './formButton.hbs';

interface ButtonProps {
    label: string;
    class: string;
    type: string;
    events: {
        click: (e:PointerEvent) => void;
    };
}

class FormButton extends Block {
    constructor(props: ButtonProps) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default FormButton;
