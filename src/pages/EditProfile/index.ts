import Block from '../../core/Block';
import template from './editProfile.hbs';
import DataUnitLi from '../../components/DataUnitLi';
import FormButton from '../../components/FormButton';
import {
    validationEmail, validationLogin, validationName, validationPhone,
} from '../../utils/validation';
import formDataOutput from '../../utils/formDataOutput';
import Link from '../../components/Link';
import router from '../../index';
import { TUser } from '../../API/baseAPI';
import UserController from '../../controllers/userController';

class EditProfile extends Block {
    constructor() {
        super();
    }

    protected init():void {
        const isEdit = true;
        this.children.dataUnitLi1 = new DataUnitLi({
            header: 'Phone number',
            textValue: '+7-(977)-777-77-77',
            name: 'phone',
            isEdit,
            validationHandler: validationPhone,
        });
        this.children.dataUnitLi2 = new DataUnitLi({
            header: 'Email',
            textValue: 'ivanivanov@ya.ru',
            name: 'email',
            isEdit,
            validationHandler: validationEmail,
        });
        this.children.dataUnitLi3 = new DataUnitLi({
            header: 'Login',
            textValue: 'ivanivanov',
            name: 'login',
            isEdit,
            validationHandler: validationLogin,
        });
        this.children.dataUnitLi4 = new DataUnitLi({
            header: 'Firstname',
            textValue: 'Ivan',
            name: 'first_name',
            isEdit,
            validationHandler: validationName,
        });
        this.children.dataUnitLi5 = new DataUnitLi({
            header: 'Lastname',
            textValue: 'Ivanov',
            name: 'second_name',
            isEdit,
            validationHandler: validationName,
        });
        this.children.dataUnitLi6 = new DataUnitLi({
            header: 'Name in chats',
            textValue: 'Ivan',
            name: 'display_name',
            isEdit,
            validationHandler: validationName,
        });
        this.children.goBackLink = new Link({
            href: '/settings',
            goBack: true,
            class: 'go-back-btn__a',
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    router.back();
                },
            },
        });
        this.children.formButton = new FormButton({
            class: 'profile-data-form__submit submit',
            label: 'Save changes',
            type: 'submit',
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    const names = [
                        'phone',
                        'email',
                        'login',
                        'first_name',
                        'second_name',
                        'display_name',
                    ];
                    const formElem = document.querySelector('form') as HTMLFormElement;
                    formDataOutput(formElem, names);

                    const phone = this.children.dataUnitLi1;
                    const email = this.children.dataUnitLi2;
                    const login = this.children.dataUnitLi3;
                    const first_name = this.children.dataUnitLi4;
                    const second_name = this.children.dataUnitLi5;
                    const chatName = this.children.dataUnitLi6;
                    let validationsResults: TUser = {};
                    
                    validationsResults.phone = validationPhone(phone, 1);
                    validationsResults.email = validationEmail(email, 1);
                    validationsResults.login = validationLogin(login, 1);
                    validationsResults.first_name = validationName(first_name, 1);
                    validationsResults.second_name = validationName(second_name, 1);
                    validationsResults.display_name = validationName(chatName, 1);
                    
                    if(!Object.values(validationsResults).includes(undefined!)) {
                        UserController.updateProfile(validationsResults)
                            .then(res => {
                                console.log(res);
                            });
                        router.go("/settings");
                    }
                },
            },
        });
    }

    protected render(): DocumentFragment {
        this.init();
        return this.compile(template, this.props);
    }
}

export default EditProfile;
