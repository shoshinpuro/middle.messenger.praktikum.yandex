import { FormInput } from "../../components/FormInput/index";
import { FormButton } from "../../components/FormButton/index"
import Block from "../../core/Block";
import template from "./signUp.hbs";
import { validationEmail, validationLogin, validationName, validationPassword, validationPhone} from "../../utils/validation";

export class SignUp extends Block {
    constructor() {
        super()
    }

    protected init():void {
        this.children.inputPhone = new FormInput({
            type: 'tel',
            name:'phone', 
            label: 'Phone number', 
            value: this.props.phone,
            validationHandler: validationPhone
        });
        this.children.inputEmail = new FormInput({
            type: 'email',
            name:'email', 
            label: 'Email', 
            value: this.props.email,
            validationHandler: validationEmail
        });
        this.children.inputLogin = new FormInput({
            type: 'text', 
            name:'login', 
            label: 'Login', 
            value: this.props.login,
            validationHandler: validationLogin
        });
        this.children.inputFirstname = new FormInput({
            type: 'text',
            name:'firstname', 
            label: 'Firstname', 
            value: this.props.firstname,
            validationHandler: validationName
        });
        this.children.inputLastname = new FormInput({
            type: 'text',
            name:'lastname', 
            label: 'Lastname', 
            value: this.props.lastname,
            validationHandler: validationName
            
        });
        this.children.inputPassword = new FormInput({
            type: 'password',
            name:'password', 
            label: 'Password', 
            value: this.props.password,
            validationHandler: validationLogin
        });
        this.children.inputPassword2 = new FormInput({
            type: 'password',
            name:'password2', 
            label: 'Password (again)', 
            value: this.props.password2,
            validationHandler: validationLogin
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
