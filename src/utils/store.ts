
import EventBus from "../core/EventBus";
import { TIndexed, set } from "./utilFunctions";
import isEqual from "./isEqual";
import Block from "../core/Block";

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

export  function connect(mapStateToProps: (state: TIndexed) => any) {
    return function(Component: typeof Block) {
        return class NewComponent  extends Component {
            constructor(props: any) {
                let state = mapStateToProps(store.getState());
                console.log(store);
                console.log(state);
                super({ ...props, ...state });
                store.on(StoreEvents.Updated, () => {
                    const newState = mapStateToProps(store.getState());
                    //console.log(state);
                    //console.log(newState);
                    if (!isEqual(state, newState)) {
                        this.setProps({...newState});
                    }
                    state = newState;
                });
            }
        };
    };
}

export default store;
