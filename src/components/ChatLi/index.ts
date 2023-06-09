import Block from '../../core/Block';
import template from './chatLi.hbs';
import Image from '../Image';
import img from '../../assets/img/AmandaSekar.png';

interface ChatLiProps {
    link: string;
    firstname: string;
    lastname: string;
    sender: string;
    lastMessage: string;
    time: string;
    messagesCount?: string;
    events?: {};
}

class ChatLi extends Block {
    constructor(props: ChatLiProps) {
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
