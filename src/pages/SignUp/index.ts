import { Input } from "../../components/Input/index";
import { FormButton } from "../../components/FormButton/index"
import Block from "../../core/Block";
import template from "./signUp.hbs";
import { validationEmail, validationLogin, validationName, validationPassword, validationPhone} from "../../utils/validation";

export class SignUp extends Block {
    constructor() {
        super()
    }

    protected init():void {
        this.children.inputPhone = new Input({
            type: 'tel',
            name:'phone', 
            label: 'Phone number', 
            value: this.props.phone,
            events: {
                change: () => {
                    validationPhone(this.children.inputPhone)
                }
            }
        });
        this.children.inputEmail = new Input({
            type: 'email',
            name:'email', 
            label: 'Email', 
            value: this.props.email,
            events: {
                change: () => {
                    validationEmail(this.children.inputEmail)
                }
            }
        });
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
        this.children.inputFirstname = new Input({
            type: 'text',
            name:'firstname', 
            label: 'Firstname', 
            value: this.props.firstname,
            events: {
                change: () => {
                    validationName(this.children.inputFirstname)
                }
            }
        });
        this.children.inputLastname = new Input({
            type: 'text',
            name:'lastname', 
            label: 'Lastname', 
            value: this.props.lastname,
            events: {
                change: () => {
                    validationName(this.children.inputLastname)
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
        });
        this.children.inputPassword2 = new Input({
            type: 'password',
            name:'password2', 
            label: 'Password (again)', 
            value: this.props.password2,
            events: {
                change: () => {
                    validationPassword(this.children.inputPassword2)
                }
            }
        });
        this.children.formButton = new FormButton({
            class: 'sign-up-form__submit submit',
            label: 'Register',
            type: 'submit',
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    const phone = this.children.inputPhone;
                    const email = this.children.inputEmail;
                    const login = this.children.inputLogin;
                    const password = this.children.inputPassword;
                    const firstname = this.children.inputFirstname;
                    const lastname = this.children.inputLastname;
                    const password2 = this.children.inputPassword2;
                    //const validationsResults = [];
                    validationPhone(phone);
                    validationEmail(email);
                    validationLogin(login);
                    validationName(firstname);
                    validationName(lastname);
                    validationPassword(password);
                    validationPassword(password2);
                },
            }, 
        });
    }

    protected render(): DocumentFragment{
        this.init();
        return this.compile(template, this.props)
    }
}
