import { ConversationMessages } from "../../components/ConversationMessages";
import { ChatLi } from "../../components/ChatLi";
import { Image } from "../../components/Image";
import imgAvatar from "../../assets/img/avatar.png"
import Block from "../../core/Block";
import template from "./chatsPage.hbs";

export class Chats extends Block {
    constructor() {
        super()
    }

    protected init():void {
        this.children.conversationMessages = new ConversationMessages({

        });
        this.children.image = new Image({ src: imgAvatar, alt: "user photo", class: "user-avatar__img"});
        this.children.chatLi1 = new ChatLi({
            link: '#',
            firstname: 'Amanda',
            lastname: 'Sekar',
            sender: '',
            lastMessage: 'Пока всё. Остальное залью на диск и отправлю позже.',
            time: '18:49',
            messagesCount: '128'
        });
        this.children.chatLi2 = new ChatLi({
            link: '#',
            firstname: 'Marina',
            lastname: 'Terekh',
            sender: '',
            lastMessage: 'Image',
            time: '16:08',
            messagesCount: '2'
        });
        this.children.chatLi3 = new ChatLi({
            link: '#',
            firstname: 'Andrew',
            lastname: 'Kirski',
            sender: 'You:',
            lastMessage: 'Sticker',
            time: '12:00'
        });
    }

    protected render(): DocumentFragment{
        this.init();
        return this.compile(template, this.props)
    }
}
