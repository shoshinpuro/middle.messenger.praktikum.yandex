import Block from "../../core/Block";
import template from "./chatLi.hbs";

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

export class ChatLi extends Block {
    constructor(props: ChatLiProps) {
        super(props);
    }
    
    render() {
        return this.compile(template, {...this.props})
    }
}
