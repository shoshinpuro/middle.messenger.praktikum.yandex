import { Block } from '../../core/Block';
import template from './error.hbs';

interface IErrorProps {
    status: string;
    message: string;
}

class ErrorPage extends Block<IErrorProps> {
    render() {
        return this.compile(template, { ...this.props });
    }
}

export default ErrorPage;
