import { Block } from '../../core/Block';
import template from './close.hbs';

interface CloseProps {
    events: {
        click: (evt: PointerEvent) => void;
    };
}

export default class Close extends Block<CloseProps> {
    constructor(props: CloseProps) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
