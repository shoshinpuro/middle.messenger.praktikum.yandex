import FormInput from '../../components/FormInput/index';
import FormButton from '../../components/FormButton/index';
import { Block } from '../../core/Block';
import template from './signUp.hbs';
import {
    validationEmail, validationLogin, validationName,
    validationPassword, validationPassword2, validationPhone,
} from '../../utils/validation';
import Link from '../../components/Link';
import router, { Routes } from '../../index';
import AuthController from '../../controllers/authController';
import { TUser } from '../../API/baseConstants';

class SignUp extends Block {
    constructor() {
        super({});
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
            value: this.props.first_name as string,
            validationHandler: validationName,
        });
        this.children.inputLastname = new FormInput({
            type: 'text',
            name: 'second_name',
            label: 'Lastname',
            classInput: 'sign-up-form__lastname-input  form-input',
            value: this.props.second_name as string,
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
        this.children.loginLink = new Link({
            title: 'Sign in',
            href: '/',
            class: 'sign-up-form__sign-in',
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    router.go(Routes.Login);
                },
            },
        });
        this.children.formButton = new FormButton({
            class: 'sign-up-form__submit submit',
            label: 'Register',
            type: 'submit',
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();

                    const phone = this.children.inputPhone as Block;
                    const email = this.children.inputEmail as Block;
                    const login = this.children.inputLogin as Block;
                    const password = this.children.inputPassword as Block;
                    const firstName = this.children.inputFirstname as Block;
                    const secondName = this.children.inputLastname as Block;
                    const password2 = this.children.inputPassword2 as Block;
                    const validationsResults: TUser = {};
                    validationsResults.phone = validationPhone(phone, 0);
                    validationsResults.email = validationEmail(email, 0);
                    validationsResults.login = validationLogin(login, 0);
                    validationsResults.first_name = validationName(firstName, 0);
                    validationsResults.second_name = validationName(secondName, 0);
                    validationsResults.password = validationPassword2(password, 0, password2);

                    if (!Object.values(validationsResults).includes(undefined!)) {
                        AuthController.signUp(validationsResults);
                        // .then((res) => console.log(res));
                        router.go(Routes.ProfilePreferences);
                    }
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
