import { Input } from "../../components/Input/index";
import { FormButton } from "../../components/FormButton/index"
import Block from "../../core/Block";
import template from "./login.hbs";

export class Login extends Block {
    constructor() {
        super()
    }

    protected init():void {
        this.state = {};
        this.children.inputLogin = new Input({
            type: 'text', 
            events: {
                change: (evt) => {
                    console.log(evt);
                    const value = evt.target.value;
                    this.setProps({login: value});
                }
            }, 
            name:'login', 
            label: 'Login', 
            value: this.props.login
        });
        this.children.inputPassword = new Input({
            type: 'password',
            events: {
                change: (evt) => {
                    console.log(evt);
                    const value = evt.target.value;
                    this.state.password = value;
                }
            }, 
            name:'password', 
            label: 'Password', 
            value: this.props.password 
        })
        this.children.formButton = new FormButton({
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    const regex = /(?=.*[a-z])^[a-z-z0-9-_]{3,20}$/i;
                    const regexArr = [
                        {message: /^\s*$/}, 
                        {name: /^[А-ЯЁA-Z][а-яёa-z-]+$/}, 
                        {email: /^[a-z0-9][a-z0-9-_]+\@[a-z]+\.[a-z]+$/i}, 
                        {password: /(?=.*[A-Z])(?=.*[0-9])^[0-9a-zA-Z!@#$%^&*]{8,40}$/}, 
                        {phone: /^[0-9+][0-9]{9,14}$/}, 
                        {login: /(?=.*[a-z])^[a-z-z0-9-_]{3,20}$/i} 
                    ];
                    const login = (this.children.inputLogin.element?.firstElementChild as HTMLInputElement).value;
                    console.log(login.match(regex))
                    if(login === login.match(regex)?.[0] && login.length <= 20){
                        this.children.inputLogin.setProps({error: ''})
                    } else {
                        this.children.inputLogin.setProps({error: 'some error'});
                    }
                    
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
