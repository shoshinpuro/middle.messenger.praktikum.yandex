import EventBus from '../core/EventBus';
import { TIndexed, set } from './utilFunctions';

export default class Store extends EventBus {
    private state: TIndexed = {};

    public getState() {
        return this.state;
    }

    public set(path: string, value: unknown) {
        set(this.state, path, value);

        this.emit('updated');
    }

    public resetState() {
        for (const key in this.state) { // eslint-disable-line no-restricted-syntax, guard-for-in
            set(this.state, key, '');
        } // eslint-disable-line guard-for-in
    }
}
