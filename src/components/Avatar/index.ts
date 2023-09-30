import { Block } from '../../core/Block';
import template from './avatar.hbs';
import Image from '../Image';
import img from '../../assets/img/AmandaSekar.png';
import { TIndexed } from '../../utils/utilFunctions';

interface AvatarProps {
    first_name: string;
    second_name: string;
    srcImg?: string;
    events?: TIndexed;
}

class Avatar extends Block<AvatarProps> {
    constructor(props: AvatarProps) {
        super(props);
    }

    init() {
        this.children.image = new Image({
            src: this.props?.srcImg as string || img,
            alt: 'user photo',
            class: 'user-info__avatar-img',
        });
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}

export default Avatar;
