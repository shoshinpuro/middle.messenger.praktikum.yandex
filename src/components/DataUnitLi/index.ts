import Block from "../../core/Block";
import template from "./dataUnitLi.hbs"

interface dataUnitLiProps {
    header: string;
    textValue: string;
    isEdit?: boolean;
    name?: string;
    events?: {};
}

export class DataUnitLi extends Block {
    constructor(props: dataUnitLiProps) {
        super(props);
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
