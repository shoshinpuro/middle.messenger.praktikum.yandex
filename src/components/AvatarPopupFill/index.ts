import { Block } from '../../core/Block';
import template from './avatarPopupFill.hbs';
import FormInput from '../FormInput';
import FormButton from '../FormButton';
import { IPopupFillProps } from '../../utils/interfaces';
// import router, { Routes } from '../..';
import store from '../../utils/storeHOC';

interface IAvatarPopupFillProps extends IPopupFillProps {
    avatarHandler: (data: File, chatId: number) => void;
}
class AvatarPopupFill extends Block<IAvatarPopupFillProps> {
    init() {
        this.children.inputUploadAvatar = new FormInput({
            name: 'avatar',
            label: 'Choose a profile picture:',
            type: 'file',
            accept: 'image/png, image/jpeg',
            classInput: 'set-avatar__input avatar-form__input',
            error: this.props?.error as string,
        });
        this.children.confirmButton = new FormButton({
            label: 'Confirm',
            class: 'popup__confirm',
            type: 'submit',
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    const input = document.querySelector('.set-avatar__input') as HTMLInputElement;
                    const data = input.files![0];
                    if (data) {
                        this.props.avatarHandler(data, store.getState().selectedChat);
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

export default AvatarPopupFill;
