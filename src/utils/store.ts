
import EventBus from "../core/EventBus";
import { TIndexed, set } from "./utilFunctions";
import isEqual from "./isEqual";

export enum StoreEvents {
    Updated = 'updated',
}

export class Store extends EventBus {
    private state: TIndexed = {};

    public getState() {
        return this.state;
    }

    public set(path: string, value: unknown) {
        set(this.state, path, value);

            this.emit(StoreEvents.Updated);
    };
}

const store = new Store();
console.log(store.getState());

export  function connect(mapStateToProps: (state: TIndexed) => TIndexed) {
    return function(Component: any) {
        return class extends Component {
            constructor(tag: string, props: any) {
                let state = mapStateToProps(store.getState());
                super(tag,{ ...props, ...state });
                store.on('updated', () => {
                    const newState = mapStateToProps(store.getState());
                    if (!isEqual(state, newState)) {
                        this.setProps(store.getState());
                    }
                    state = newState;
                });
            }
        };
    };
}

export default store;
