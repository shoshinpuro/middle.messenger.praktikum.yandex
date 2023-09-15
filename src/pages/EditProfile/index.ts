import Block from '../../core/Block';
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
import router from '../../index';
import { connect } from '../../utils/store';
import url from '../../API/baseAPI';
import { TUser } from '../../API/baseAPI';
import UserController from '../../controllers/userController';
import AuthController from '../../controllers/authController';

class EditProfile extends Block {
    constructor(props: any) {
        super({...props});
    }

    protected init():void {
        const avaSrc = this.props.avatar?`${url}/resources${this.props.avatar}`:'';
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
            header: 'Set a new avatar'
        });
        console.log(this.props);
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
            textValue: 'Ivan',
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
                    router.go('/settings');
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
                    const first_name = this.children.dataUnitLi4 as Block;
                    const second_name = this.children.dataUnitLi5 as Block;
                    const displayName = this.children.dataUnitLi6 as Block;
                    let validationsResults: TUser = {};
                    
                    validationsResults.phone = validationPhone(phone, 1);
                    validationsResults.email = validationEmail(email, 1);
                    validationsResults.login = validationLogin(login, 1);
                    validationsResults.first_name = validationName(first_name, 1);
                    validationsResults.second_name = validationName(second_name, 1);
                    validationsResults.display_name = validationName(displayName, 1);
                    
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


function mapStateToProps(state: any) {
    return state.user ?? [];
}



const withUser = connect(mapStateToProps);
const EditProfilePage = withUser(EditProfile as typeof Block);
export default EditProfilePage;
