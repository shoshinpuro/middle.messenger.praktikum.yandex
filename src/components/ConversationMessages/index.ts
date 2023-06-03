import Block from "../../core/Block";
import template from "./conversationMessages.hbs";

interface conversationMessagesProps {
    events?: {};
}

export class ConversationMessages extends Block {
    constructor(props: conversationMessagesProps) {
        super(props);
    }
    
    render() {
        return this.compile(template, {...this.props})
    }
}
