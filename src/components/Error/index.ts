import Block from "../../core/Block";
import template from "./error.hbs";

interface ErrorProps {
    status: string;
    message: string;
}

export class ErrorPage extends Block {
    constructor(props: ErrorProps) {
        super(props)
    }

    render() {
        return this.compile(template, { ...this.props});
    }
}
