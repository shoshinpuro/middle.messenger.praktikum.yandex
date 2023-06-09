import FormInput from '../../components/FormInput/index';
import FormButton from '../../components/FormButton/index';
import Block from '../../core/Block';
import template from './signUp.hbs';
import {
    validationEmail, validationLogin, validationName, validationPassword, validationPhone,
} from '../../utils/validation';
import formDataOutput from '../../utils/formDataOutput';

class SignUp extends Block {
    constructor() {
        super();
    }

    protected init():void {
        this.children.inputPhone = new FormInput({
            type: 'tel',
            name: 'phone',
            label: 'Phone number',
            classInput: 'sign-up-form__phone-input  form-input',
            value: this.props.phone as string,
            validationHandler: validationPhone,
        });
        this.children.inputEmail = new FormInput({
            type: 'email',
            name: 'email',
            label: 'Email',
            classInput: 'sign-up-form__email-input  form-input',
            value: this.props.email as string,
            validationHandler: validationEmail,
        });
        this.children.inputLogin = new FormInput({
            type: 'text',
            name: 'login',
            label: 'Login',
            classInput: 'sign-up-form__login-input  form-input',
            value: this.props.login as string,
            validationHandler: validationLogin,
        });
        this.children.inputFirstname = new FormInput({
            type: 'text',
            name: 'first_name',
            label: 'Firstname',
            classInput: 'sign-up-form__firstname-input  form-input',
            value: this.props.firstname as string,
            validationHandler: validationName,
        });
        this.children.inputLastname = new FormInput({
            type: 'text',
            name: 'second_name',
            label: 'Lastname',
            classInput: 'sign-up-form__lastname-input  form-input',
            value: this.props.lastname as string,
            validationHandler: validationName,

        });
        this.children.inputPassword = new FormInput({
            type: 'password',
            name: 'password',
            label: 'Password',
            classInput: 'sign-up-form__password-input  form-input',
            value: this.props.password as string,
            validationHandler: validationPassword,
        });
        this.children.inputPassword2 = new FormInput({
            type: 'password',
            name: 'password2',
            label: 'Password (again)',
            classInput: 'sign-up-form__password2-input  form-input',
            value: this.props.password2 as string,
            validationHandler: validationPassword,
        });
        this.children.formButton = new FormButton({
            class: 'sign-up-form__submit submit',
            label: 'Register',
            type: 'submit',
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    const names = [
                        'phone',
                        'email',
                        'login',
                        'first_name',
                        'second_name',
                        'password',
                        'password2',
                    ];
                    const formElem = document.querySelector('form') as HTMLFormElement;
                    formDataOutput(formElem, names);

                    const phone = this.children.inputPhone;
                    const email = this.children.inputEmail;
                    const login = this.children.inputLogin;
                    const password = this.children.inputPassword;
                    const firstname = this.children.inputFirstname;
                    const lastname = this.children.inputLastname;
                    const password2 = this.children.inputPassword2;
                    // const validationsResults = [];
                    validationPhone(phone, 0);
                    validationEmail(email, 0);
                    validationLogin(login, 0);
                    validationName(firstname, 0);
                    validationName(lastname, 0);
                    validationPassword(password, 0);
                    validationPassword(password2, 0);
                },
            },
        });
    }

    protected render(): DocumentFragment {
        this.init();
        return this.compile(template, this.props);
    }
}

export default SignUp;
