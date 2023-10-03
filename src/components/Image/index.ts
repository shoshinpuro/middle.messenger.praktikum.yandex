import { Block } from '../../core/Block';
import { TClickHandler } from '../../utils/types';
import template from './image.hbs';

interface IImageProps {
    class: string;
    src: string;
    alt: string;
    events?: {
        click?: TClickHandler;
    };
}

class Image extends Block<IImageProps> {
    render() {
        return this.compile(template, { ...this.props });
    }
}
export default Image;
