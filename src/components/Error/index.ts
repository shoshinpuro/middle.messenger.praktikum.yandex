import { Block } from '../../core/Block';
import template from './error.hbs';

interface ErrorProps {
    status: string;
    message: string;
}

class ErrorPage extends Block<ErrorProps> {
    constructor(props: ErrorProps) {
        super(props);
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}

export default ErrorPage;
