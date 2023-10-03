import { Block } from '../../core/Block';
import { TClickHandler } from '../../utils/types';
import template from './close.hbs';

interface ICloseProps {
    events: {
        click: TClickHandler;
    };
}

export default class Close extends Block<ICloseProps> {
    render() {
        return this.compile(template, this.props);
    }
}
