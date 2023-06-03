import Block  from '../../core/Block';
import template from './allPages.hbs';

type link = {
  link: string;
  label: string;
}

type AllPagesProps = {
  pages: link[];
  events?: {
    click?: (e: PointerEvent) => void
  }
}

export class AllPages extends Block {
  constructor(props: AllPagesProps) {
    super(props)
  }

  render() {
  return this.compile(template, { ...this.props});
  }
}
