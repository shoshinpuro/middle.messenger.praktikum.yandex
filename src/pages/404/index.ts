import { ErrorPage } from "../../components/Error/index"
import Block from "../../core/Block";
import template from "./404.hbs";

export class Error404 extends Block {
    constructor() {
        super()
    }

    protected init():void {
        this.children.error = new ErrorPage({
            status: '404', 
            message:'Content wasn’t found'
        });
    }

    protected render(): DocumentFragment{
        this.init();
        return this.compile(template, this.props)
    }
}
