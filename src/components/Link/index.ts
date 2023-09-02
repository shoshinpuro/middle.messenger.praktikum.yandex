import Block from '../../core/Block';
import template from './link.hbs';

interface LinkProps {
    href: string;
    class?: string;
    title?: string;
    src?: string;
    alt?: string;
    classImg?: string;
    path?: string;
    path2?: string;
    fill?: string;
    goBack?: boolean;
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
