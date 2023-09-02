import ConversationMessages from '../../components/ConversationMessages';
import ChatLi from '../../components/ChatLi';
import Image from '../../components/Image';
import imgAvatar from '../../assets/img/avatar.png';
import Block from '../../core/Block';
import template from './myChats.hbs';
import Link from '../../components/Link';
import router from '../..';

class Chats extends Block {
    constructor() {
        super();
    }

    protected init():void {
        this.children.conversationMessages = new ConversationMessages({

        });
        this.children.profileLink = new Link({
            href: '/settings',
            class: 'preferences',
            src: imgAvatar,
            alt: 'user photo',
            classImg: 'user-avatar__img',
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    router.go('/settings');
                }
            }
        });
        this.children.chatLi1 = new ChatLi({
            link: '#',
            first_name: 'Amanda',
            second_name: 'Sekar',
            sender: '',
            lastMessage: 'Пока всё. Остальное залью на диск и отправлю позже.',
            time: '18:49',
            messagesCount: '128',
        });
        this.children.chatLi2 = new ChatLi({
            link: '#',
            first_name: 'Marina',
            second_name: 'Terekh',
            sender: '',
            lastMessage: 'Image',
            time: '16:08',
            messagesCount: '2',
        });
        this.children.chatLi3 = new ChatLi({
            link: '#',
            first_name: 'Andrew',
            second_name: 'Kirski',
            sender: 'You:',
            lastMessage: 'Sticker',
            time: '12:00',
        });
    }

    protected render(): DocumentFragment {
        this.init();
        return this.compile(template, this.props);
    }
}

export default Chats;
