import { Block } from '../../../core/Block';
import template from './deleteChatPopupFill.hbs';
import FormButton from '../../FormButton';
import ChatController from '../../../controllers/chatController';
import { IPopupFillProps } from '../../../utils/interfaces';
import { connect } from '../../../utils/storeHOC';

class DeleteChatPopupFillBase extends Block<IPopupFillProps> {
    init() {
        this.children.confirmButton = new FormButton({
            label: 'Confirm',
            class: 'popup__confirm',
            type: 'submit',
            events: {
                click: async (evt: PointerEvent) => {
                    evt.preventDefault();
                    const chatId = this.props.selectedChat;
                    if (chatId) {
                        await ChatController.deleteChat(chatId);
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

const DeleteChatPopupFill = withSelectedChat(DeleteChatPopupFillBase as typeof Block);

export default DeleteChatPopupFill;
