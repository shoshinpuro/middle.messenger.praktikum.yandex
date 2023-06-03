import Block from "../../core/Block";
import template from "./editProfile.hbs";
import { DataUnitLi } from "../../components/DataUnitLi";
import { FormButton } from "../../components/FormButton";
import { validationEmail, validationLogin, validationName, validationPhone } from "../../utils/validation";
import { formDataOutput } from "../../utils/formDataOutput";

export class EditProfile extends Block {
    constructor() {
        super()
    }

    protected init():void {
    const isEdit = true;
        this.children.dataUnitLi1 = new DataUnitLi({
            header: 'Phone number',
            textValue: '+7-(977)-777-77-77',
            name: 'phone',
            isEdit: isEdit,
            validationHandler: validationPhone
        });
        this.children.dataUnitLi2 = new DataUnitLi({
            header: 'Email',
            textValue: 'ivanivanov@ya.ru',
            name: 'email',
            isEdit: isEdit,
            validationHandler: validationEmail
        });
        this.children.dataUnitLi3 = new DataUnitLi({
            header: 'Login',
            textValue: 'ivanivanov',
            name: 'login',
            isEdit: isEdit,
            validationHandler: validationLogin
        });
        this.children.dataUnitLi4 = new DataUnitLi({
            header: 'Firstname',
            textValue: 'Ivan',
            name: 'first_name',
            isEdit: isEdit,
            validationHandler: validationName
        });
        this.children.dataUnitLi5 = new DataUnitLi({
            header: 'Lastname',
            textValue: 'Ivanov',
            name: 'second_name',
            isEdit: isEdit,
            validationHandler: validationName
        });
        this.children.dataUnitLi6 = new DataUnitLi({
            header: 'Name in chats',
            textValue: 'Ivan',
            name: 'display_name',
            isEdit: isEdit,
            validationHandler: validationName
        });
        this.children.formButton = new FormButton({
            class: 'profile-data-form__submit submit',
            label: 'Save changes',
            type: 'submit',
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    const names = ['phone', 'email', 'login', 'first_name', 'second_name', 'display_name'];
                    const formElem = document.querySelector('form') as HTMLFormElement;
                    formDataOutput(formElem, names);
                    
                    const phone = this.children.dataUnitLi1;
                    const email = this.children.dataUnitLi2;
                    const login = this.children.dataUnitLi3;
                    const firstname = this.children.dataUnitLi4;
                    const lastname = this.children.dataUnitLi5;
                    const chatName = this.children.dataUnitLi6;
                    //const validationsResults = [];
                    validationEmail(email, 1);
                    validationPhone(phone, 1);
                    validationEmail(email, 1);
                    validationLogin(login, 1);
                    validationName(firstname, 1);
                    validationName(lastname, 1);
                    validationName(chatName, 1);
                },
            }, 
        });
    }

    protected render(): DocumentFragment{
        this.init();
        return this.compile(template, this.props)
    }
}
