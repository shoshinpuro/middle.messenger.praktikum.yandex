class EventBus {
    private readonly listeners: Record<string, Array<() => void>> = {};

    on(event: string, callback: any) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off(event: string, callback: ()=>void) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter(
            (listener) => listener !== callback,
        );
    }

    emit(event: string, ...args: any) {
        if (!this.listeners[event]) {
            throw new Event( // eslint-disable-line @typescript-eslint/no-throw-literal
                `Нет события: ${event}`,
            );
        }
        this.listeners[event].forEach((listener) => {
            listener(...args);
        });
    }
}
export default EventBus;
