import Block from '../../core/Block';
import template from './avatar.hbs';
import Image from '../Image';
import img from '../../assets/img/AmandaSekar.png';

interface AvatarProps {
    first_name: string;
    second_name: string;
    link?: string;
    events?: {};
}

class ChatLi extends Block {
    constructor(props: AvatarProps) {
        super(props);
    }

    init() {
        this.children.image = new Image({ src: img, alt: 'user photo', class: 'user-avatar__img' });
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}

export default ChatLi;
