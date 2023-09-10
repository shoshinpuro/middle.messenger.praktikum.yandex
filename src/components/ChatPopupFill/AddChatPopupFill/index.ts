import Block from '../../../core/Block';
import template from './addChatPopupFill.hbs';
import FormInput from '../../FormInput'; 
import FormButton from '../../FormButton';
import ChatController from '../../../controllers/chatController';
import { PopupFillProps } from '../../../utils/interfaces';

class AddChatPopupFill extends Block<PopupFillProps> {
    constructor(props: PopupFillProps) {
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

export default AddChatPopupFill;
