import { Block } from '../../core/Block';
import template from './link.hbs';
import Image from '../Image';
import url from '../../API/baseConstants';
import store from '../../utils/storeHOC';
import { TClickHandler } from '../../utils/types';

interface ILinkProps {
    href: string;
    class?: string;
    title?: string;
    src?: string;
    alt?: string;
    classImg?: string;
    path?: string;
    classWrap?: string;
    path2?: string;
    fill?: string;
    goBack?: boolean;
    events?: {
        click?: TClickHandler;
    };
}

export default class Link extends Block<ILinkProps> {
    init() {
        const avatarSubpath = store.getState()?.user?.avatar;
        const avaSrc = avatarSubpath ? `${url}/resources${avatarSubpath}` : '';
        this.children.image = new Image({
            src: avaSrc || this.props.src as string,
            alt: this.props.alt!,
            class: this.props.classImg!,
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
