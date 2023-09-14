import Block from '../../core/Block';
import template from './popup.hbs';
import Close from '../Close';
import AvatarPopupFill from '../AvatarPopupFill';
import PasswordPopupFill from '../PasswordPopupFill';
import AddChatPopupFill from '../ChatPopupFill/AddChatPopupFill';
import UserInChatPopupFill from '../UserInChatPopupFill';
import DeleteChatPopupFill from '../ChatPopupFill/DeleteChatPopupFill';
import ChatController from '../../controllers/chatController';
import { connect } from '../../utils/store';

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
        const fillProps: {[x: string]: Block} = {
            'Set a new avatar': new AvatarPopupFill({}), 
            'Create a new chat': new AddChatPopupFill({popupHandler: () => this.hide()}), 
            'Change password': new PasswordPopupFill({}), 
            'Add user to chat': new UserInChatPopupFill({
                userHandler: (userLoginsArr: string[], chatId: number) => {
                    ChatController.addUsersToChat({logins: userLoginsArr, chatId: chatId});
                },
                popupHandler: () => this.hide()
            }), 
            'Delete user from chat': new UserInChatPopupFill({
                userHandler: (userLoginsArr: string[], chatId: number) => {
                    ChatController.deleteUsersFromChat({logins: userLoginsArr, chatId: chatId});
                },
                popupHandler: () => this.hide()
            }), 
            'Delete chat': new DeleteChatPopupFill({popupHandler: () => this.hide()})
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
