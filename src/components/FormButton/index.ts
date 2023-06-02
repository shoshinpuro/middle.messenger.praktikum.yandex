import Block from '../../core/Block';
import template from './formButton.hbs';

interface ButtonProps {
  label: string;
  events: {
    click: (e:PointerEvent) => void;
  };
}

export class FormButton extends Block {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
