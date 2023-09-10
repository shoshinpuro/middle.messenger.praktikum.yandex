import ConversationMessages from '../../components/ConversationMessages';
import ChatList from '../../components/ChatList';
import Image from '../../components/Image';
import imgAvatar from '../../assets/img/avatar.png';
import Block from '../../core/Block';
import template from './myChats.hbs';
import Link from '../../components/Link';
import router from '../..';
import ChatController from '../../controllers/chatController';
import AuthController from '../../controllers/authController';
import Popup from '../../components/Popup';

import { TIndexed } from '../../utils/utilFunctions';

export default class Chats extends Block {
    constructor(props: any) {
        super(props);
    }

    protected init():void {
        ChatController.getChats();
        AuthController.getUser();
        this.children.createChatPopup = new Popup({
            header: 'Create a new chat'
        });
        this.children.createChatLink = new Link({
            href: '',
            class: 'create-new-chat',
            path: 'M9.49992 2.375C13.8541 2.375 17.4166 5.20917 17.4166 8.70833C17.4166 9.1675 17.3533 9.61083 17.2424 10.0383C16.7753 9.80083 16.2687 9.62667 15.7383 9.5475C15.8016 9.27833 15.8333 8.99333 15.8333 8.70833C15.8333 6.08792 12.9991 3.95833 9.49992 3.95833C6.00075 3.95833 3.16659 6.08792 3.16659 8.70833C3.16659 11.3287 6.00075 13.4583 9.49992 13.4583L10.3628 13.4188L10.2916 14.25L10.3549 15.0021L9.49992 15.0417C8.55784 15.0417 7.61575 14.9071 6.70534 14.6458C5.25659 15.8333 3.4595 16.5379 1.58325 16.625C3.42784 14.7804 3.76034 13.5375 3.76034 13.0625C3.09922 12.5418 2.56127 11.8815 2.18493 11.1288C1.80858 10.3762 1.60313 9.54963 1.58325 8.70833C1.58325 5.20917 5.14575 2.375 9.49992 2.375ZM14.2499 11.0833H15.8333V13.4583H18.2083V15.0417H15.8333V17.4167H14.2499V15.0417H11.8749V13.4583H14.2499V11.0833Z',
            classWrap: 'create-new-chat__icon circle',
            fill: 'black',
            events: {
                    click: (evt: PointerEvent) => {
                        evt.preventDefault();
                        (this.children.createChatPopup as Block).show();           
                    }
                
            },
        });
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
        
        console.log(this.props);
        this.children.chatList = new ChatList({
            isLoaded: false
            /*link: '#',
            title: (this.props as TIndexed)?.[6]?.title,
            lastMessage: (this.props as TIndexed)?.[6]?.last_message,
            messagesCount: (this.props as TIndexed)?.[6]?.unread_count*/
        });
        /*this.children.chatLi2 = new ChatLi({
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
        });*/
        console.log(this.props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

