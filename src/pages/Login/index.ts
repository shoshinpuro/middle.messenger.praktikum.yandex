import FormInput from '../../components/FormInput/index';
import FormButton from '../../components/FormButton/index';
import Block from '../../core/Block';
import template from './login.hbs';
import { validationLogin, validationPassword } from '../../utils/validation';
import formDataOutput from '../../utils/formDataOutput';

class Login extends Block {
    constructor() {
        super();
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
                    const login = this.children.inputLogin;
                    const password = this.children.inputPassword;
                    // const validationsResults = [];
                    validationLogin(login, 0);
                    validationPassword(password, 0);
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
