import Block from "../../core/Block";
import template from "./image.hbs";

interface ImageProps {
    class: string;
    src: string;
    alt: string;
    events?: {};
}

export class Image extends Block {
    constructor(props: ImageProps) {
        super(props);
    }
    
    render() {
        return this.compile(template, {...this.props})
    }
}
