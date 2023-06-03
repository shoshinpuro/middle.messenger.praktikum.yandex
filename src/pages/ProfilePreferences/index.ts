import Block from "../../core/Block";
import template from "./profile-preferences.hbs";

export class ProfilePreferences extends Block {
    constructor() {
        super()
    }

    protected init():void {
        
    }

    protected render(): DocumentFragment{
        this.init();
        return this.compile(template, this.props)
    }
}
