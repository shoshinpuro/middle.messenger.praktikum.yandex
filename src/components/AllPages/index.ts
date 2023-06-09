import Block from '../../core/Block';
import template from './allPages.hbs';

type Link = {
    link: string;
    label: string;
};

type AllPagesProps = {
    pages: Link[];
    events?: {
        click?: (e: PointerEvent) => void
    }
};

class AllPages extends Block {
    constructor(props: AllPagesProps) {
        super(props);
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}

export default AllPages;
