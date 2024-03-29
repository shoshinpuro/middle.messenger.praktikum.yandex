import { Block } from '../../core/Block';
import template from './userInChatPopupFill.hbs';
import FormInput from '../FormInput';
import FormButton from '../FormButton';
import { IPopupFillProps } from '../../utils/interfaces';
import { connect } from '../../utils/storeHOC';

interface IUserPopupFillProps extends IPopupFillProps {
    selectedChat?: number;
    userHandler: (userLoginsArr: Array<string>, chatId: number) => void
}

class UserInChatPopupFillBase extends Block<IUserPopupFillProps> {
    init() {
        this.children.userLoginsInput = new FormInput({
            type: 'text',
            name: 'chat-name',
            label: 'User login',
            classInput: 'user-login__input form-input',
        });
        this.children.confirmButton = new FormButton({
            label: 'Confirm',
            class: 'popup__confirm',
            type: 'submit',
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    const userLogins = ((this.children.userLoginsInput as Block)
                        .element?.children[0] as HTMLInputElement).value;
                    const userLoginsArr = userLogins.split(',');
                    this.props.userHandler(userLoginsArr, this.props.selectedChat!);
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
const withSelectedChat = connect((state) => {
    const selectedChatId = state.selectedChat;

    if (!selectedChatId) {
        return {
            messages: [],
            chats: [...(state.chats || [])],
            selectedChat: null,
            userId: state.user?.id || undefined,
        };
    }

    return {
        messages: (state.messages || {})[selectedChatId] || [],
        chats: [...(state.chats || [])],
        selectedChat: state.selectedChat,
        userId: state.user?.id || undefined,
    };
});

const UserInChatPopupFill = withSelectedChat(UserInChatPopupFillBase as typeof Block);
export default UserInChatPopupFill;
