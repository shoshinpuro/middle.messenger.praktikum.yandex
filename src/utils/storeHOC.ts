import Store from './storeBase';
import isEqual from './isEqual';
import { Block } from '../core/Block';
import { TIndexed } from './utilFunctions';

const store = new Store();

export function connect(mapStateToProps: (state: TIndexed) => TIndexed) {
    return function getComponent(Component: typeof Block) {
        return class NewComponent extends Component {
            constructor(props: TIndexed) {
                let state = mapStateToProps(store.getState());
                super({ ...props, ...state });
                store.on('updated', () => {
                    const newState = mapStateToProps(store.getState());
                    if (!isEqual(state, newState)) {
                        this.setProps({ ...newState });
                    }
                    state = newState;
                });
            }
        };
    };
}

export default store;
