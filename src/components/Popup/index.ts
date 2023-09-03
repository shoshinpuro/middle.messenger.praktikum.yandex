import Block from '../../core/Block';
import template from './popup.hbs';
import AvatarPopupFill from '../AvatarPopupFill';
import PasswordPopupFill from '../PasswordPopupFill';
import Close from '../Close';

interface PopupProps {
    header: string;
    error?: string;
    isAvatar?: boolean;
    isChats?: boolean;
    eventHandler?: (evt: PointerEvent) => void;
    events?: {
      click?: (evt: PointerEvent) => void;
    }
}

export default class Popup extends Block {
    constructor(props: PopupProps) {
        super(props);
        this.hide();
    }

    init() {
        this.children.close = new Close({
            events:{
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    this.hide();                
                },
            }
        });

        if (this.props?.isAvatar) {
            this.children.AvatarPopupFill = new AvatarPopupFill({
                error: this.props?.error as string
            });
        } else if (this.props?.isChats){
            
        } else {
            this.children.PasswordPopupFill = new PasswordPopupFill({
                error: this.props?.error as string
            });
        }
    }

    render() {
        return this.compile(template, this.props);
    }
}
