
import EventBus from "../core/EventBus";
import { TIndexed, set } from "./utilFunctions";
import isEqual from "./isEqual";
import Block from "../core/Block";


export class Store extends EventBus {
    private state: TIndexed = {};

    public getState() {
        return this.state;
    }

    public set(path: string, value: unknown) {
        set(this.state, path, value);

        this.emit('updated');
    };

    public resetState() {
        for(let key in this.state) {
            set(this.state, key, '');
        }
    }
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
                store.on('updated', () => {
                    const newState = mapStateToProps(store.getState());
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
