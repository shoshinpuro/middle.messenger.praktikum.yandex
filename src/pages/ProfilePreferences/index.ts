import Block from '../../core/Block';
import template from './profilePreferences.hbs';
import DataUnitLi from '../../components/DataUnitLi';
import Link from '../../components/Link';
import Avatar from '../../components/Avatar';
import Popup from '../../components/Popup';
import router, { Routes } from '../../index';
import AuthController from '../../controllers/authController';
// import UserController from '../../controllers/userController';
import { connect } from '../../utils/storeHOC';
import url from '../../API/baseConstants';

class ProfilePreferences extends Block {
    constructor(props: any) {
        super({ ...props });
        AuthController.getUser();
    }

    init():void {
        AuthController.getUser();
        const avaSrc = this.props.avatar ? `${url}/resources${this.props.avatar}` : '';
        this.children.avatar = new Avatar({
            first_name: this.props.first_name as string,
            second_name: this.props.second_name as string,
            srcImg: avaSrc,
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    router.go(Routes.EditProfile);
                },
            },
        });
        this.children.popupPassword = new Popup({
            header: 'Change password',
        });
        this.children.goBackLink = new Link({
            href: '/messages',
            goBack: true,
            class: 'go-back-btn__a',
            classWrap: 'action__icon',
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    router.go(Routes.Chats);
                },
            },
        });
        this.children.dataUnitLi1 = new DataUnitLi({
            header: 'Phone number',
            textValue: this.props.phone as string,
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    router.go(Routes.EditProfile);
                },
            },
        });
        this.children.dataUnitLi2 = new DataUnitLi({
            header: 'Email',
            textValue: this.props.email as string,
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    router.go(Routes.EditProfile);
                },
            },
        });
        this.children.dataUnitLi3 = new DataUnitLi({
            header: 'Login',
            textValue: this.props.login as string,
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    router.go(Routes.EditProfile);
                },
            },
        });
        this.children.dataUnitLi4 = new DataUnitLi({
            header: 'Firstname',
            textValue: this.props.first_name as string,
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    router.go(Routes.EditProfile);
                },
            },
        });
        this.children.dataUnitLi5 = new DataUnitLi({
            header: 'Lastname',
            textValue: this.props.second_name as string,
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    router.go(Routes.EditProfile);
                },
            },
        });
        this.children.dataUnitLi6 = new DataUnitLi({
            header: 'Name in chats',
            textValue: this.props.display_name as string || '',
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    router.go(Routes.EditProfile);
                },
            },
        });
        this.children.changeAuthLink = new Link({
            href: '/edit-settings',
            class: 'action__a', // eslint-disable-next-line max-len
            path: 'M10 10.7917V3.29168C10 3.05557 10.08 2.85779 10.24 2.69834C10.4 2.5389 10.5978 2.4589 10.8333 2.45834H16.6667C16.9028 2.45834 17.1008 2.53834 17.2608 2.69834C17.4208 2.85834 17.5006 3.05612 17.5 3.29168V7.45834C17.5 7.69445 17.42 7.89251 17.26 8.05251C17.1 8.21251 16.9022 8.29223 16.6667 8.29168H12.5L10 10.7917ZM16.625 17.5C14.8333 17.5 13.0867 17.1006 11.385 16.3017C9.68333 15.5028 8.17639 14.4472 6.86417 13.135C5.55195 11.8228 4.49639 10.3158 3.6975 8.61418C2.89861 6.91251 2.49945 5.16612 2.5 3.37501C2.5 3.12501 2.58333 2.91668 2.75 2.75001C2.91667 2.58334 3.125 2.50001 3.375 2.50001H6.75C6.94445 2.50001 7.11806 2.56251 7.27083 2.68751C7.42361 2.81251 7.51389 2.97223 7.54167 3.16668L8.08333 6.08334C8.11111 6.27779 8.1075 6.45501 8.0725 6.61501C8.0375 6.77501 7.95778 6.91723 7.83333 7.04168L5.83333 9.08334C6.41667 10.0833 7.14583 11.0208 8.02083 11.8958C8.89583 12.7708 9.86111 13.5278 10.9167 14.1667L12.875 12.2083C13 12.0833 13.1633 11.9897 13.365 11.9275C13.5667 11.8653 13.7644 11.8478 13.9583 11.875L16.8333 12.4583C17.0278 12.5 17.1875 12.5939 17.3125 12.74C17.4375 12.8861 17.5 13.0561 17.5 13.25V16.625C17.5 16.875 17.4167 17.0833 17.25 17.25C17.0833 17.4167 16.875 17.5 16.625 17.5Z',
            fill: 'black',
            title: 'Change authorization data',
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    router.go(Routes.EditProfile);
                },
            },
        });
        this.children.changePasswordLink = new Link({
            href: '#change-password-modal',
            class: 'action__a', // eslint-disable-next-line max-len
            path: 'M4.99992 18.3333C4.54159 18.3333 4.14909 18.17 3.82242 17.8433C3.49575 17.5167 3.3327 17.1245 3.33325 16.6667V8.33334C3.33325 7.87501 3.49659 7.48251 3.82325 7.15584C4.14992 6.82918 4.54214 6.66612 4.99992 6.66668H5.83325V5.00001C5.83325 3.84723 6.23964 2.86446 7.05242 2.05168C7.8652 1.2389 8.8477 0.832789 9.99992 0.833344C11.1527 0.833344 12.1355 1.23973 12.9483 2.05251C13.761 2.86529 14.1671 3.84779 14.1666 5.00001V6.66668H14.9999C15.4583 6.66668 15.8508 6.83001 16.1774 7.15668C16.5041 7.48334 16.6671 7.87557 16.6666 8.33334V16.6667C16.6666 17.125 16.5033 17.5175 16.1766 17.8442C15.8499 18.1708 15.4577 18.3339 14.9999 18.3333H4.99992ZM9.99992 14.1667C10.4583 14.1667 10.8508 14.0033 11.1774 13.6767C11.5041 13.35 11.6671 12.9578 11.6666 12.5C11.6666 12.0417 11.5033 11.6492 11.1766 11.3225C10.8499 10.9958 10.4577 10.8328 9.99992 10.8333C9.54159 10.8333 9.14909 10.9967 8.82242 11.3233C8.49575 11.65 8.3327 12.0422 8.33325 12.5C8.33325 12.9583 8.49659 13.3508 8.82325 13.6775C9.14992 14.0042 9.54214 14.1672 9.99992 14.1667ZM7.49992 6.66668H12.4999V5.00001C12.4999 4.30557 12.2569 3.71529 11.7708 3.22918C11.2846 2.74307 10.6944 2.50001 9.99992 2.50001C9.30548 2.50001 8.7152 2.74307 8.22909 3.22918C7.74298 3.71529 7.49992 4.30557 7.49992 5.00001V6.66668Z',
            fill: 'black',
            title: 'Change password',
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    (this.children.popupPassword as Block).show();
                },
            },
        });
        this.children.changeNameLink = new Link({
            href: '/edit-settings',
            class: 'action__a', // eslint-disable-next-line max-len
            path: 'M15.3417 4.83333L14.3333 3.82499C13.6833 3.17499 12.625 3.17499 11.975 3.82499L9.74167 6.05833L2.5 13.3V16.6667H5.86667L13.15 9.38333L15.3417 7.19166C16 6.54166 16 5.48333 15.3417 4.83333ZM5.175 15H4.16667V13.9917L11.3833 6.77499L12.3917 7.78333L5.175 15ZM9.16667 16.6667L12.5 13.3333H17.5V16.6667H9.16667Z',
            fill: 'black',
            title: 'Change name',
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    router.go(Routes.EditProfile);
                },
            },
        });
        this.children.logoutLink = new Link({
            href: '/',
            class: 'action__a', // eslint-disable-next-line max-len
            path: 'M4.99992 1.66666H12.4999C12.9419 1.66666 13.3659 1.84225 13.6784 2.15481C13.991 2.46737 14.1666 2.8913 14.1666 3.33332V4.99999H12.4999V3.33332H4.99992V16.6667H12.4999V15H14.1666V16.6667C14.1666 17.1087 13.991 17.5326 13.6784 17.8452C13.3659 18.1577 12.9419 18.3333 12.4999 18.3333H4.99992C4.55789 18.3333 4.13397 18.1577 3.82141 17.8452C3.50885 17.5326 3.33325 17.1087 3.33325 16.6667V3.33332C3.33325 2.8913 3.50885 2.46737 3.82141 2.15481C4.13397 1.84225 4.55789 1.66666 4.99992 1.66666Z',
            fill: '#912121', // eslint-disable-next-line max-len
            path2: 'M13.4083 12.9917L14.5833 14.1667L18.75 10L14.5833 5.83334L13.4083 7.00834L15.5583 9.16668H7.5V10.8333H15.5583L13.4083 12.9917Z',
            title: 'Log out',
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    AuthController.logout();
                },
            },
        });
    }

    protected componentDidUpdate(oldProps: any, newProps: any): boolean { // eslint-disable-line @typescript-eslint/no-unused-vars, max-len
        console.log(oldProps); // eslint-disable-line no-console
        const avaSrc = newProps.avatar ? `${url}/resources${newProps.avatar}` : '';
        console.error(newProps);
        this.children.avatar = new Avatar({
            first_name: this.props.first_name as string,
            second_name: this.props.second_name as string,
            srcImg: avaSrc,
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    router.go(Routes.EditProfile);
                },
            },
        });
        this.children.dataUnitLi1 = new DataUnitLi({
            header: 'Phone number',
            textValue: newProps.phone as string,
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    router.go(Routes.EditProfile);
                },
            },
        });
        this.children.dataUnitLi2 = new DataUnitLi({
            header: 'Email',
            textValue: newProps.email as string,
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    router.go(Routes.EditProfile);
                },
            },
        });
        this.children.dataUnitLi3 = new DataUnitLi({
            header: 'Login',
            textValue: newProps.login as string,
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    router.go(Routes.EditProfile);
                },
            },
        });
        this.children.dataUnitLi4 = new DataUnitLi({
            header: 'Firstname',
            textValue: newProps.firstname as string,
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    router.go(Routes.EditProfile);
                },
            },
        });
        this.children.dataUnitLi5 = new DataUnitLi({
            header: 'Lastname',
            textValue: newProps.lastname as string,
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    router.go(Routes.EditProfile);
                },
            },
        });
        this.children.dataUnitLi6 = new DataUnitLi({
            header: 'Name in chats',
            textValue: newProps.displayname as string,
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    router.go(Routes.EditProfile);
                },
            },
        });
        return true;
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
const ProfilePage = withUser(ProfilePreferences as typeof Block);
export default ProfilePage;
