import { Block } from '../../core/Block';
import template from './passwordPopupFill.hbs';
import FormInput from '../FormInput';
import FormButton from '../FormButton';
import { validationPassword, validationPassword2 } from '../../utils/validation';
import UserController from '../../controllers/userController';
import AuthController from '../../controllers/authController';
import { IPopupFillProps } from '../../utils/interfaces';

class PasswordPopupFill extends Block<IPopupFillProps> {
    init() {
        this.children.oldPasswordInput = new FormInput({
            type: 'password',
            name: 'old-password',
            label: 'Old password',
            classInput: 'password-form__password-input change-password__input form-input',
        });
        this.children.newPasswordInput = new FormInput({
            type: 'password',
            name: 'password',
            label: 'New password',
            classInput: 'sign-up-form__password-input change-password__input form-input',
            validationHandler: validationPassword,
        });
        this.children.newPassword2Input = new FormInput({
            type: 'password',
            name: 'password2',
            label: 'New password (again)',
            classInput: 'sign-up-form__password-input change-password__input form-input',
            validationHandler: validationPassword,
        });
        this.children.confirmButton = new FormButton({
            label: 'Confirm',
            class: 'popup__confirm',
            type: 'submit',
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    const data = { oldPassword: '', newPassword: '' };
                    const oldPassword = validationPassword(this.children.oldPasswordInput as Block, 0); // eslint-disable-line max-len
                    const newPassword = validationPassword2(this.children.newPasswordInput as Block, 0, this.children.newPassword2Input as Block); // eslint-disable-line max-len
                    if (newPassword && oldPassword) {
                        data.oldPassword = oldPassword;
                        data.newPassword = newPassword;
                        UserController.changePassword(data);
                        AuthController.getUser();
                        const hidePopup = this.props.popupHandler!;
                        hidePopup();
                    }
                },
            },
        });
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}

export default PasswordPopupFill;
