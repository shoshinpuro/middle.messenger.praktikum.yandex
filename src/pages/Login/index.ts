import FormInput from '../../components/FormInput/index';
import FormButton from '../../components/FormButton/index';
import Link from '../../components/Link';
import Block from '../../core/Block';
import template from './login.hbs';
import { validationLogin, validationPassword } from '../../utils/validation';
import formDataOutput from '../../utils/formDataOutput';
import router, { Routes } from '../../index';
import AuthController from '../../controllers/authController';
import ChatController from '../../controllers/chatController';
import { TUser } from '../../API/baseAPI';

class Login extends Block {
    constructor() {
        super({});
    }

    protected init():void {
        this.children.inputLogin = new FormInput({
            type: 'text',
            name: 'login',
            label: 'Login',
            classInput: 'sign-in-form__login-input  form-input', // &&&
            value: this.props.login as string,
            validationHandler: validationLogin,
        });
        this.children.inputPassword = new FormInput({
            type: 'password',
            name: 'password',
            label: 'Password',
            classInput: 'sign-in-form__password-input  form-input',
            value: this.props.password as string,
            validationHandler: validationPassword,
        });
        this.children.registerLink = new Link({
            title: 'Create account',
            href: '/sign-up',
            class: 'sign-in-form__sign-up',
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    router.go(Routes.SignUp);
                },
            },
        });
        this.children.formButton = new FormButton({
            class: 'sign-in-form__submit submit',
            label: 'Sign in',
            type: 'submit',
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    const names = ['login', 'password'];
                    const formElem = document.querySelector('form') as HTMLFormElement;
                    formDataOutput(formElem, names);
                    const login = this.children.inputLogin as Block;
                    const password = this.children.inputPassword as Block;

                    let validationsResults: TUser = {};
                    validationsResults.login = validationLogin(login, 0);
                    validationsResults.password = validationPassword(password, 0);
                    
                    if (!Object.values(validationsResults).includes(undefined!)) {
                        AuthController.signIn(validationsResults)
                            .then(() => ChatController.getChats());
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

export default Login;
