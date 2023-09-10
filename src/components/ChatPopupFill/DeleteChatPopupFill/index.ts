import Block from '../../../core/Block';
import template from './deleteChatPopupFill.hbs';
import FormInput from '../../FormInput';
import FormButton from '../../FormButton';
import ChatController from '../../../controllers/chatController';
import { PopupFillProps } from '../../../utils/interfaces';

class DeleteChatPopupFill extends Block<PopupFillProps> {
    constructor(props: PopupFillProps) {
        super(props);
    }
    init() {
        this.children.chatNameInput = new FormInput({ 
            type: 'text',
            name: 'chat-name',
            label: 'Chat name',
            classInput: 'chat-delete__input form-input',
        });
        this.children.confirmButton = new FormButton({
            label: 'Confirm',
            class: 'popup__confirm',
            type: 'submit',
            events: {
                click : (evt: PointerEvent) => {
                    evt.preventDefault();
                    const chatId = (document.querySelector('.chat-delete__input') as HTMLInputElement).value;
                    const data = {chatId: Number(chatId)};
                    if(chatId.trim()) {
                        console.log(chatId);
                        ChatController.deleteChat(data);
                    }
                },
            },
        });
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}

export default DeleteChatPopupFill;
