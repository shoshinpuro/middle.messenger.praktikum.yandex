import { Block } from '../../core/Block';
import template from './popup.hbs';
import Close from '../Close';
import AvatarPopupFill from '../AvatarPopupFill';
import PasswordPopupFill from '../PasswordPopupFill';
import AddChatPopupFill from '../ChatPopupFill/AddChatPopupFill';
import UserInChatPopupFill from '../UserInChatPopupFill';
import DeleteChatPopupFill from '../ChatPopupFill/DeleteChatPopupFill';
import ChatController from '../../controllers/chatController';
import { TClickHandler } from '../../utils/types';

interface IPopupProps {
    header: string;
    error?: string;
    eventHandler?: TClickHandler;
    events?: {
        click?: TClickHandler;
    };
}

class Popup extends Block<IPopupProps> {
    constructor(props: IPopupProps) {
        super(props);
    }

    init() {
        const addAvatar = (data: File, selectedChatId?: number) => {
            const formData = new FormData();
            if (selectedChatId) {
                formData.append('chatId', selectedChatId.toString());
            }
            formData.append('avatar', data);
            ChatController.uploadAvatarChat(formData);
        };
        const addUsers = (userLoginsArr: string[], chatId: number) => {
            ChatController.addUsersToChat({ logins: userLoginsArr, chatId });
        };
        const popupHide = () => this.hide();

        const fillProps: { [x: string]: Block } = {
            'Set a new avatar': new AvatarPopupFill({
                avatarHandler: addAvatar,
                popupHandler: popupHide,
            }),
            'Create a new chat': new AddChatPopupFill({ popupHandler: popupHide }),
            'Change password': new PasswordPopupFill({ popupHandler: popupHide }),
            'Add user to chat': new UserInChatPopupFill({
                userHandler: addUsers,
                popupHandler: popupHide,
            }),
            'Delete user from chat': new UserInChatPopupFill({
                userHandler: addUsers,
                popupHandler: popupHide,
            }),
            'Delete chat': new DeleteChatPopupFill({ popupHandler: popupHide }),
            'Set a new chat avatar': new AvatarPopupFill({
                avatarHandler: addAvatar,
                popupHandler: popupHide,
            }),
        };
        Object.keys(fillProps).forEach((key) => {
            if (this.props.header === key) {
                this.children.fillPopup = fillProps[key];
            }
        });

        this.children.close = new Close({
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    this.hide();
                },
            },
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default Popup;
