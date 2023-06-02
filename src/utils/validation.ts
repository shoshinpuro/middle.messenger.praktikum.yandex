import Block from '../core/Block';

const regexObj = {
    message: /^\s*$/, 
    name: /^[А-ЯЁA-Z][а-яёa-z-]+$/, 
    email: /^[a-z0-9][a-z0-9-_]+\@[a-z]+\.[a-z]+$/i, 
    password: /(?=.*[A-Z])(?=.*[0-9])^[0-9a-zA-Z!@#$%^&*]{8,40}$/, 
    phone: /^[0-9+][0-9]{9,14}$/, 
    login: /(?=.*[a-z])^[a-z-z0-9-_]{3,20}$/i 
};

export function validationLogin(elem: Block) {
    const inputValue = (elem.element?.firstElementChild as HTMLInputElement).value;
    const result = inputValue.match(regexObj.login)?.[0]
    if(result) {
        elem.setProps({error: ''});
    } else {
        elem.setProps({error: 'от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)', value: inputValue});
    }
}
