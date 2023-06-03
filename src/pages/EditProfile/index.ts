import Block from "../../core/Block";
import template from "./edit-profile.hbs";

export class EditProfile extends Block {
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
