
import EventBus from "../core/EventBus";
import { Indexed, set } from "./utilFunctions";

export enum StoreEvents {
Updated = 'updated',
}

class Store extends EventBus {
    private state: Indexed = {};

    constructor() {
        super();
    }

    public getState() {
        return this.state;
    }

    public set(path: string, value: unknown) {
        set(this.state, path, value);

            this.emit(StoreEvents.Updated);
    };
}

export default new Store(); 
