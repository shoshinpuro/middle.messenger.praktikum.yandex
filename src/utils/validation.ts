import Block from '../core/Block';

const regexObj = {
    message: /^\s*$/, 
    name: /^[А-ЯЁA-Z][а-яёa-z-]+$/, 
    email: /^[a-z0-9][a-z0-9-_.]+\@[a-z]+\.[a-z]+$/i, 
    password: /(?=.*[A-Z])(?=.*[0-9])^[0-9a-zA-Z!@#$%^&*]{8,40}$/, 
    phone: /^[0-9+][0-9]{9,14}$/, 
    login: /(?=.*[a-z])^[a-z-z0-9-_]{3,20}$/i 
};

export function validationLogin(elem: Block, childNum: number) {
    const inputValue = (elem.element?.children[childNum] as HTMLInputElement).value;
    const result = inputValue.match(regexObj.login)?.[0]
    if(result) {
        elem.setProps({error: '', value: inputValue});
    } else {
        elem.setProps({error: '3-20 символов, латиница, допустимы -_ и цифры', value: inputValue});
    }
    return result;
}
export function validationPassword(elem: Block, childNum: number = 0) {
    const inputValue = (elem.element?.children[childNum] as HTMLInputElement).value;
    const result = inputValue.match(regexObj.password)?.[0]
    if(result) {
        elem.setProps({error: '', value: inputValue});
    } else {
        elem.setProps({error: '8-40 символов, обязательно хотя бы одна заглавная буква и цифра', value: inputValue});
    }
    return result;
}
export function validationEmail(elem: Block, childNum: number = 0) {
    const inputValue = (elem.element?.children[childNum] as HTMLInputElement).value;
    const result = inputValue.match(regexObj.email)?.[0];
    console.log(`!!!!!inputValue ${inputValue}`)
    if(result) {
        elem.setProps({error: '', value: inputValue});
    } else {
        elem.setProps({error: 'введите корректный email', value: inputValue});
    }
    return result;
}
export function validationName(elem: Block, childNum: number = 0) {
    const inputValue = (elem.element?.children[childNum] as HTMLInputElement).value;
    const result = inputValue.match(regexObj.name)?.[0]
    if(result) {
        elem.setProps({error: '', value: inputValue});
    } else {
        elem.setProps({error: 'С заглавной буквы, допустим только дефис', value: inputValue});
    }
    return result;
}
export function validationPhone(elem: Block, childNum: number = 0) {
    const inputValue = (elem.element?.children[childNum] as HTMLInputElement).value;
    const result = inputValue.match(regexObj.phone)?.[0]
    if(result) {
        elem.setProps({error: '', value: inputValue});
    } else {
        elem.setProps({error: 'введите коррекный номер телефона', value: inputValue});
    }
    return result;
}
export function validationMessage(elem: Block, childNum: number = 0) {
    const inputValue = (elem.element?.children[childNum] as HTMLInputElement).value;
    const result = inputValue.match(regexObj.message)?.[0]
    if(result) {
        console.log('ok');
    } else {
        console.log(elem);
    }
    return result;
}
