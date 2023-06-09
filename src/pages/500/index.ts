import ErrorPage from '../../components/Error/index';
import Block from '../../core/Block';
import template from './500.hbs';

class Error500 extends Block {
    constructor() {
        super();
    }

    protected init():void {
        this.children.error = new ErrorPage({
            status: '500',
            message: 'Sorry, server error',
        });
    }

    protected render(): DocumentFragment {
        this.init();
        return this.compile(template, this.props);
    }
}

export default Error500;
