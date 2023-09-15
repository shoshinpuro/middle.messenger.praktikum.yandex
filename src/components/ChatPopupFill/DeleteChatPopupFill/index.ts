import Block from '../../../core/Block';
import template from './deleteChatPopupFill.hbs';
import FormButton from '../../FormButton';
import ChatController from '../../../controllers/chatController';
import { PopupFillProps } from '../../../utils/interfaces';
import { connect } from '../../../utils/store';

class DeleteChatPopupFillBase extends Block<PopupFillProps> {
    constructor(props: PopupFillProps) {
        super(props);
    }
    init() {
        this.children.confirmButton = new FormButton({
            label: 'Confirm',
            class: 'popup__confirm',
            type: 'submit',
            events: {
                click : (evt: PointerEvent) => {
                    evt.preventDefault();
                    const chatId = this.props.selectedChat;
                    if(chatId) {
                        ChatController.deleteChat(chatId);
                    }
                    const hidePopup = this.props.popupHandler!;
                    hidePopup();
                },
            },
        });
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}

const withSelectedChat = connect((state) => ({
    selectedChat: state.selectedChat || undefined,
}));
  
const DeleteChatPopupFill = withSelectedChat(DeleteChatPopupFillBase as any);

export default DeleteChatPopupFill;
