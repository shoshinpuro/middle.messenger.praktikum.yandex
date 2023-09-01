import { nanoid } from 'nanoid';
import EventBus from './EventBus';
/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
/* eslint class-methods-use-this: ["error", { "exceptMethods": [
    "_getChildrenAndProps",
    "_createDocumentElement",
    "init",
    "componentDidMount",
    "componentDidUpdate",
    "render"
] }] */

type ValidationHandler = (elem: Block, childNum: number) => (string | undefined);
type Prop = object | string | ValidationHandler;
type Props = { [x:string]: Prop };

class Block {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    } as const;

    public id = nanoid(6);

    private _element: HTMLElement | null = null;

    // eslint-disable-next-line max-len
    protected props: Props;

    public children: Record<string, Block>;

    _meta: { props: object };

    private eventBus: () => EventBus;

    /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
    constructor(propsWithChildren = {}) {
        const eventBus = new EventBus();

        const { props, children } = this._getChildrenAndProps(propsWithChildren);

        this._meta = {
            props,
        };

        this.children = children;
        this.props = this._makePropsProxy(props);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);

        eventBus.emit(Block.EVENTS.INIT);
    }

    _getChildrenAndProps(childrenAndProps: object) {
        const props: Record<string, Prop> = {};
        const children: Record<string, Block> = {};

        Object.entries(childrenAndProps).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { props, children };
    }

    _addEvents() {
        const { events = {} } = this.props as { events: Record<string, () =>void> };

        Object.keys(events).forEach((eventName) => {
            this._element?.addEventListener(eventName, events[eventName]);
        });
    }

    _removeEvents() {
        const { events = {} } = this.props as { events: Record<string, () =>void> };

        Object.keys(events).forEach((eventName) => {
            this._element?.removeEventListener(eventName, events[eventName]);
        });
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _createResources() {
        const tagName = 'div';
        this._element = this._createDocumentElement(tagName);
    }

    private _init() {
        this._createResources();

        this.init();

        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    protected init() {}

    _componentDidMount() {
        this.componentDidMount();
    }

    componentDidMount() {}

    public dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);

        Object.values(this.children).forEach((child) => child.dispatchComponentDidMount());
    }

    private _componentDidUpdate(oldProps: object, newProps: object) {
        if (this.componentDidUpdate(oldProps, newProps)) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    // eslint-disable-next-line max-len
    protected componentDidUpdate(oldProps: object, newProps: object) { // eslint-disable-line @typescript-eslint/no-unused-vars
        return true;
    }

    setProps = (nextProps: object) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    private _render() {
        const fragment = this.render();
        const newElement = fragment.firstElementChild as HTMLElement;
        this._removeEvents();
        this._element!.replaceWith(newElement);
        this._element = newElement;
        this._addEvents();
    }

    protected compile(template: (context: Props) => string, context: Props) {
        const contextAndStubs = { ...context };
        Object.entries(this.children).forEach(([name, component]) => {
            contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
        });

        const html = template(contextAndStubs);

        const temp = document.createElement('template');

        temp.innerHTML = html;

        Object.entries(this.children)
            .forEach(([_, component]) => { // eslint-disable-line @typescript-eslint/no-unused-vars
                const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

                if (!stub) {
                    return;
                }

                component.getContent()?.append(...Array.from(stub.childNodes));

                stub.replaceWith(component.getContent()!);
            });

        return temp.content;
    }

    protected render(): DocumentFragment {
        return new DocumentFragment();
    }

    getContent() {
        return this.element!;
    }

    _makePropsProxy(props: Props) {
        const self = this;

        return new Proxy(props, {
            get(target: Props, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target: Props, prop: string, value: string) {
                const oldTarget = { ...target };

                target[prop] = value; // eslint-disable-line no-param-reassign

                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа');
            },
        });
    }

    _createDocumentElement(tagName: string) {
        return document.createElement(tagName);
    }

    show() {
        this.getContent()!.style.display = 'flex';
    }

    hide() {
        this.getContent()!.style.display = 'none';
    }
}

export default Block;
