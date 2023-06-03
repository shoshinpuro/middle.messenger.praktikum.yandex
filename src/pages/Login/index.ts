import { FormInput } from "../../components/FormInput/index";
import { FormButton } from "../../components/FormButton/index"
import Block from "../../core/Block";
import template from "./login.hbs";
import { validationLogin, validationPassword} from "../../utils/validation";

export class Login extends Block {
    constructor() {
        super()
    }

    protected init():void {
        this.children.inputLogin = new FormInput({
            type: 'text', 
            name:'login', 
            label: 'Login', 
            value: this.props.login,
            validationHandler: validationLogin
        });
        this.children.inputPassword = new FormInput({
            type: 'password',
            name:'password', 
            label: 'Password', 
            value: this.props.password,
            validationHandler: validationPassword
        })
        this.children.formButton = new FormButton({
            class: 'sign-in-form__submit submit',
            label: 'Sign in',
            type: 'submit',
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    const login = this.children.inputLogin;
                    const password = this.children.inputPassword;
                    const validationsResults = [];
                    validationsResults.push(validationLogin(login));
                    validationPassword(password);
                },
            }, 
        })
    }

    protected render(): DocumentFragment{
        this.init();
        return this.compile(template, this.props)
    }
}
