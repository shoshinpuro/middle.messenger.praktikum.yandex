import Block from '../core/Block';

const regexObj = {
    message: /^\s*$/,
    name: /^[А-ЯЁA-Z][а-яёa-z-]+$/,
    email: /^[a-z0-9][a-z0-9-_.]+@[a-z]+\.[a-z]+$/i,
    password: /(?=.*[A-Z])(?=.*[0-9])^[0-9a-zA-Z!@#$%^&*]{8,40}$/,
    phone: /^[0-9+][0-9]{9,14}$/,
    login: /(?=.*[a-z])^[a-z-z0-9-_]{3,20}$/i,
};

export function validationLogin(elem: Block, childNum: number) {
    const inputValue = (elem.element?.children[childNum] as HTMLInputElement).value;
    const result = inputValue.match(regexObj.login)?.[0];
    if (result) {
        elem.setProps({
            error: '',
            value: inputValue,
        });
    } else {
        elem.setProps({
            error: '3-20 символов, латиница, допустимы -_ и цифры',
            value: inputValue,
        });
    }
    console.log(result);
    return result;
}
export function validationPassword(elem: Block, childNum: number) {
    const inputValue = (elem.element?.children[childNum] as HTMLInputElement).value;
    const result = inputValue.match(regexObj.password)?.[0];
    if (result) {
        elem.setProps({
            error: '',
            value: inputValue,
        });
    } else {
        elem.setProps({
            error: '8-40 символов, обязательно хотя бы одна заглавная буква и цифра',
            value: inputValue,
        });
    }
    console.log(result);
    return result;
}
export function validationPassword2(elem: Block, childNum: number, elem2: Block) {
    const inputValue = (elem.element?.children[childNum] as HTMLInputElement).value;
    const inputValue2 = (elem2.element?.children[childNum] as HTMLInputElement).value;
    let result = inputValue === inputValue2;
    if (result && validationPassword(elem, childNum)) {
        elem2.setProps({
            error: '',
            value: inputValue2,
        });
        return inputValue2;
    } else if(validationPassword(elem, childNum)){
        elem2.setProps({
            error: 'Пароли не совпадают',
            value: inputValue2,
        });
    } else {
        elem.setProps({
            error: '8-40 символов, обязательно хотя бы одна заглавная буква и цифра',
            value: inputValue,
        });
    }
    console.log(result);
}
export function validationEmail(elem: Block, childNum: number) {
    const inputValue = (elem.element?.children[childNum] as HTMLInputElement).value;
    const result = inputValue.match(regexObj.email)?.[0];
    if (result) {
        elem.setProps({
            error: '',
            value: inputValue,
        });
    } else {
        elem.setProps({
            error: 'введите корректный email',
            value: inputValue,
        });
    }
    console.log(result);
    return result;
}
export function validationName(elem: Block, childNum: number) {
    const inputValue = (elem.element?.children[childNum] as HTMLInputElement).value;
    const result = inputValue.match(regexObj.name)?.[0];
    if (result) {
        elem.setProps({
            error: '',
            value: inputValue,
        });
    } else {
        elem.setProps({
            error: 'С заглавной буквы, допустим только дефис',
            value: inputValue,
        });
    }
    console.log(result);
    return result;
}
export function validationPhone(elem: Block, childNum: number) {
    const inputValue = (elem.element?.children[childNum] as HTMLInputElement).value;
    const result = inputValue.match(regexObj.phone)?.[0];
    if (result) {
        elem.setProps({
            error: '',
            value: inputValue,
        });
    } else {
        elem.setProps({
            error: 'введите корректный номер телефона',
            value: inputValue,
        });
    }
    console.log(result);
    return result;
}
export function validationMessage(elem: Block, childNum: number) {
    const inputValue = (elem.element?.children[childNum] as HTMLInputElement).value;
    const result = inputValue.match(regexObj.message)?.[0];
    if (result) {
        console.log('ok'); // eslint-disable-line no-console
    } else {
        console.log(elem); // eslint-disable-line no-console
    }
    return result;
}
