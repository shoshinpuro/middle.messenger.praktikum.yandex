import { Block } from '../../core/Block';
import template from './image.hbs';

interface ImageProps {
    class: string;
    src: string;
    alt: string;
    events?: {
        click?: (e: PointerEvent) => void
    }
}

class Image extends Block<ImageProps> {
    constructor(props: ImageProps) {
        super(props);
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}
export default Image;
