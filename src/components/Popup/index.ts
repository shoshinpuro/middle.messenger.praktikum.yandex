import Block from '../../core/Block';
import template from './popup.hbs';
import AvatarPopupFill from '../AvatarPopupFill';
import PasswordPopupFill from '../PasswordPopupFill';
import AddChatPopupFill from '../ChatPopupFill/AddChatPopupFill';
import Close from '../Close';
import UserInChatPopupFill from '../UserInChatPopupFill';
import DeleteChatPopupFill from '../ChatPopupFill/DeleteChatPopupFill';
import chatController from '../../controllers/chatController';
import store from '../../utils/store';

interface PopupProps {
    header: string;
    error?: string;
    selectedChat?: number;
    eventHandler?: (evt: PointerEvent) => void;
    events?: {
      click?: (evt: PointerEvent) => void;
    }
}

export default class Popup extends Block<PopupProps> {
    constructor(props: PopupProps) {
        super(props);
        this.hide();
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
            'Create a new chat': new AddChatPopupFill({}), 
            'Change password': new PasswordPopupFill({}), 
            'Add user to chat': new UserInChatPopupFill({
                userHandler: (userLoginsArr: string[]) => {
                    chatController.addUsersToChat({logins:userLoginsArr, chatId: this.props.selectedChat!})
                    this.hide();
                }
            }), 
            'Delete user from chat': new UserInChatPopupFill({
                userHandler: (userLoginsArr: string[]) => {
                    chatController.deleteUsers({logins:userLoginsArr, chatId: this.props.selectedChat!})
                    this.hide();
                }
            }), 
            'Delete chat': new DeleteChatPopupFill({})
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
