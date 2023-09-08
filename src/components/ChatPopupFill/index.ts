import Block from '../../core/Block';
import template from './chatPopupFill.hbs';
import FormInput from '../FormInput';
import FormButton from '../FormButton';
import ChatController from '../../controllers/chatController';

interface ChatPopupFillProps {
    error?: string;
    events?: {};
}

class ChatPopupFill extends Block<ChatPopupFillProps> {
    constructor(props: ChatPopupFillProps) {
        super(props);
    }
    init() {
        this.children.chatNameInput = new FormInput({ 
            type: 'text',
            name: 'chat-name',
            label: 'Chat name',
            classInput: 'chat-name__input form-input',
        });
        this.children.confirmButton = new FormButton({
            label: 'Confirm',
            class: 'popup__confirm',
            type: 'submit',
            events: {
                click : (evt: PointerEvent) => {
                    evt.preventDefault();
                    const chatName = (document.querySelector('.chat-name__input')as HTMLInputElement).value;
                    const data = {title: chatName};
                    if(chatName.trim()) {
                        console.log(chatName);
                        ChatController.createChat(data);
                    }
                },
            },
        });
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}

export default ChatPopupFill;
