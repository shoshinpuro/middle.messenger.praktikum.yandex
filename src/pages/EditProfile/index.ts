import { Block } from '../../core/Block';
import template from './editProfile.hbs';
import DataUnitLi from '../../components/DataUnitLi';
import FormButton from '../../components/FormButton';
import Link from '../../components/Link';
import Avatar from '../../components/Avatar';
import Popup from '../../components/Popup';
import {
    validationEmail, validationLogin, validationName, validationPhone,
} from '../../utils/validation';
import formDataOutput from '../../utils/formDataOutput';
import router, { Routes } from '../../index';
import { connect } from '../../utils/storeHOC';
import url, { TUser } from '../../API/baseConstants';

import UserController from '../../controllers/userController';
import { TIndexed } from '../../utils/types';

class EditProfile extends Block {
    protected init():void {
        const avaSrc = this.props.avatar ? `${url}/resources${this.props.avatar}` : '';
        this.children.changeAvatar = new Avatar({
            first_name: this.props.first_name as string,
            second_name: this.props.second_name as string,
            srcImg: avaSrc,
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    (this.children.popupAvatar as Block).show();
                },
            },
        });

        this.children.popupAvatar = new Popup({
            header: 'Set a new avatar',
        });
        const isEdit = true;
        this.children.dataUnitLi1 = new DataUnitLi({
            header: 'Phone number',
            textValue: this.props.phone as string,
            name: 'phone',
            isEdit,
            validationHandler: validationPhone,
        });
        this.children.dataUnitLi2 = new DataUnitLi({
            header: 'Email',
            textValue: this.props.email as string,
            name: 'email',
            isEdit,
            validationHandler: validationEmail,
        });
        this.children.dataUnitLi3 = new DataUnitLi({
            header: 'Login',
            textValue: this.props.login as string,
            name: 'login',
            isEdit,
            validationHandler: validationLogin,
        });
        this.children.dataUnitLi4 = new DataUnitLi({
            header: 'Firstname',
            textValue: this.props.first_name as string,
            name: 'first_name',
            isEdit,
            validationHandler: validationName,
        });
        this.children.dataUnitLi5 = new DataUnitLi({
            header: 'Lastname',
            textValue: this.props.second_name as string,
            name: 'second_name',
            isEdit,
            validationHandler: validationName,
        });
        this.children.dataUnitLi6 = new DataUnitLi({
            header: 'Name in chats',
            textValue: this.props.display_name as string,
            name: this.props.display_name as string || '',
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
                    router.go(Routes.ProfilePreferences);
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

                    const phone = this.children.dataUnitLi1 as Block;
                    const email = this.children.dataUnitLi2 as Block;
                    const login = this.children.dataUnitLi3 as Block;
                    const firstName = this.children.dataUnitLi4 as Block;
                    const secondName = this.children.dataUnitLi5 as Block;
                    const displayName = this.children.dataUnitLi6 as Block;
                    const validationsResults: TUser = {};

                    validationsResults.phone = validationPhone(phone, 1);
                    validationsResults.email = validationEmail(email, 1);
                    validationsResults.login = validationLogin(login, 1);
                    validationsResults.first_name = validationName(firstName, 1);
                    validationsResults.second_name = validationName(secondName, 1);
                    validationsResults.display_name = validationName(displayName, 1);

                    if (!Object.values(validationsResults).includes(undefined!)) {
                        UserController.updateProfile(validationsResults);
                        // .then((res) => console.log(res));
                        router.go('/settings');
                    }
                },
            },
        });
    }

    protected componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
        console.log(oldProps, newProps); // eslint-disable-line no-console
        return true;
    }

    protected render(): DocumentFragment {
        this.init();
        return this.compile(template, this.props);
    }
}

function mapStateToProps(state: TIndexed) {
    return state.user ?? [];
}

const withUser = connect(mapStateToProps);
const EditProfilePage = withUser(EditProfile as typeof Block);
export default EditProfilePage;
