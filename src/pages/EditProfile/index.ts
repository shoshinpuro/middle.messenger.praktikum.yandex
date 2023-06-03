import Block from "../../core/Block";
import template from "./edit-profile.hbs";
import { DataUnitLi } from "../../components/DataUnitLi";

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
            isEdit: isEdit
        });
        this.children.dataUnitLi2 = new DataUnitLi({
            header: 'Email',
            textValue: 'ivanivanov@ya.ru',
            name: 'email',
            isEdit: isEdit
        });
        this.children.dataUnitLi3 = new DataUnitLi({
            header: 'Login',
            textValue: 'ivanivanov',
            name: 'login',
            isEdit: isEdit
        });
        this.children.dataUnitLi4 = new DataUnitLi({
            header: 'Firstname',
            textValue: 'Ivan',
            name: 'first_name',
            isEdit: isEdit
        });
        this.children.dataUnitLi5 = new DataUnitLi({
            header: 'Lastname',
            textValue: 'Ivanov',
            name: 'second_name',
            isEdit: isEdit
        });
        this.children.dataUnitLi6 = new DataUnitLi({
            header: 'Name in chats',
            textValue: 'Ivan',
            name: 'display_name',
            isEdit: isEdit
        });

    }

    protected render(): DocumentFragment{
        this.init();
        return this.compile(template, this.props)
    }
}
