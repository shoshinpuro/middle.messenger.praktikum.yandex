import Block from './../core/Block';
import isEqual from './isEqualPath';
import renderDOM from './renderDOM';

class Route {
    private _block: Block | null  = null;

    constructor(
        private _pathname: string,
        private _blockClass: typeof Block,
        private rootQuery: string
    ) {
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass();
            renderDOM(this._block, this.rootQuery);
            return;
        }
        this._block.show();
    }
}
export default Route;
