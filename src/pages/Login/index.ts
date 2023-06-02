import { Input } from "../../components/Input/index";
import { FormButton } from "../../components/FormButton/index"
import Block from "../../core/Block";
import template from "./login.hbs";
import { validationLogin} from "../../utils/validation";

export class Login extends Block {
    constructor() {
        super()
    }

    protected init():void {
        this.children.inputLogin = new Input({
            type: 'text', 
            name:'login', 
            label: 'Login', 
            value: this.props.login
        });
        this.children.inputPassword = new Input({
            type: 'password',
            name:'password', 
            label: 'Password', 
            value: this.props.password 
        })
        this.children.formButton = new FormButton({
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    const login = this.children.inputLogin;
                    validationLogin(login);
                },
            }, 
            label: 'Sign in' 
        })
    }

    protected render(): DocumentFragment{
        this.init();
        return this.compile(template, this.props)
    }
}
