import { Input } from "../../components/Input/index";
import { FormButton } from "../../components/FormButton/index"
import Block from "../../core/Block";
import template from "./login.hbs";
import { validationLogin, validationPassword} from "../../utils/validation";

export class Login extends Block {
    constructor() {
        super()
    }

    protected init():void {
        this.children.inputLogin = new Input({
            type: 'text', 
            name:'login', 
            label: 'Login', 
            value: this.props.login,
            events: {
                change: () => {
                    validationLogin(this.children.inputLogin)
                }
            }
        });
        this.children.inputPassword = new Input({
            type: 'password',
            name:'password', 
            label: 'Password', 
            value: this.props.password,
            events: {
                change: () => {
                    validationPassword(this.children.inputPassword)
                }
            }
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
