import Block from '../../core/Block';
import template from './link.hbs';

interface LinkProps {
    title: string;
    href: string;
    class?: string;
    events?: {
      click?: (evt: PointerEvent) => void;
  }
}

export default class Link extends Block {
    constructor(props: LinkProps) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
