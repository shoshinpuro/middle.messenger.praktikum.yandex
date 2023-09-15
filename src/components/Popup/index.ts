import Block from '../../core/Block';
import template from './popup.hbs';
import Close from '../Close';
import AvatarPopupFill from '../AvatarPopupFill';
import PasswordPopupFill from '../PasswordPopupFill';
import AddChatPopupFill from '../ChatPopupFill/AddChatPopupFill';
import UserInChatPopupFill from '../UserInChatPopupFill';
import DeleteChatPopupFill from '../ChatPopupFill/DeleteChatPopupFill';
import ChatController from '../../controllers/chatController';

interface PopupProps {
    header: string;
    error?: string;
    eventHandler?: (evt: PointerEvent) => void;
    events?: {
      click?: (evt: PointerEvent) => void;
    }
}

class Popup extends Block<PopupProps> {
    constructor(props: PopupProps) {
        super(props);
    }

    init() {
        this.children.close = new Close({
            events:{
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    this.hide();           
                },
            }
        });
        const popupHide = () => this.hide();
        const fillProps: {[x: string]: Block} = {
            'Set a new avatar': new AvatarPopupFill({popupHandler: popupHide}), 
            'Create a new chat': new AddChatPopupFill({popupHandler: popupHide}), 
            'Change password': new PasswordPopupFill({popupHandler: popupHide}), 
            'Add user to chat': new UserInChatPopupFill({
                userHandler: (userLoginsArr: string[], chatId: number) => {
                    ChatController.addUsersToChat({logins: userLoginsArr, chatId: chatId});
                },
                popupHandler: popupHide
            }), 
            'Delete user from chat': new UserInChatPopupFill({
                userHandler: (userLoginsArr: string[], chatId: number) => {
                    ChatController.deleteUsersFromChat({logins: userLoginsArr, chatId: chatId});
                },
                popupHandler: popupHide
            }), 
            'Delete chat': new DeleteChatPopupFill({popupHandler: popupHide})
        };
        for (const key in fillProps){
            this.props.header === key?
                this.children.fillPopup = fillProps[key]:
                false;
        }
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default Popup;
