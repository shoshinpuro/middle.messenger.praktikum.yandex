import Block from '../../core/Block';
import template from './chatPopupFill.hbs';
import FormInput from '../FormInput';
import FormButton from '../FormButton';
//import ChatController from '../../controllers/chatController';
import { PopupFillProps } from '../../utils/interfaces';

interface userPopupFillProps extends PopupFillProps {
    userHandler: (userLoginsArr: Array<string>) => void
}

class UserInChatPopupFill extends Block<userPopupFillProps> {
    constructor(props: userPopupFillProps) {
        super(props);
    }
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
                click : (evt: PointerEvent) => {
                    evt.preventDefault();
                    const userLogins = (document.querySelector('.user-login__input')as HTMLInputElement).value;
                    const userLoginsArr = userLogins.split(',');
                    this.props.userHandler(userLoginsArr);
                    /*const data = {title: chatName};
                    if(chatName.trim()) {
                        console.log(chatName);
                        ChatController.createChat(data);
                    }*/
                },
            },
        });
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}

export default UserInChatPopupFill;
