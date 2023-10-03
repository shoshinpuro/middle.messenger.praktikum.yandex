type TListener<T extends unknown[] = unknown[]> = (...args: T) => void;

export class EventBus< // eslint-disable-line import/prefer-default-export
    E extends string = string,
    M extends { [K in E]: unknown[] } = Record<E, any[]>,
> {
    public listeners: { [key in E]?: TListener<M[E]>[] } = {};

    on(event: E, callback: TListener<M[E]>) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event]!.push(callback);
    }

    off(event: E, callback: TListener<M[E]>) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event]!.filter(
            (listener) => listener !== callback,
        );
    }

    emit(event: E, ...args: M[E]) {
        if (!this.listeners[event]) {
            return;
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event]!.forEach((listener) => {
            listener(...args);
        });
    }
}
