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



class Block<P extends Record<string, any> = any> {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    } as const;

    public id = nanoid(6);

    private _element: HTMLElement | null = null;

    // eslint-disable-next-line max-len
    protected props: P;

    public children: Record<string, Block> | Record<string, Block[]>;

    

    private eventBus: () => EventBus;

    /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
    constructor(propsWithChildren: P) {
        const eventBus = new EventBus();

        const { props, children } = this._getChildrenAndProps(propsWithChildren);

        

        this.children = children;
        this.props = this._makePropsProxy(props);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);

        eventBus.emit(Block.EVENTS.INIT);
    }

    _getChildrenAndProps(childrenAndProps: P): {
        props: P;
        children: Record<string, Block> | Record<string, Block[]>;
      } {
        const props: Record<string, unknown> = {};
        const children: Record<string, Block> | Record<string, Block[]> = {};

        Object.entries(childrenAndProps).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { props: props as P, children };
    }

    _addEvents() {
        const { events = {} } = this.props as P & { events: Record<string, () =>void> };

        Object.keys(events).forEach((eventName) => {
            this._element?.addEventListener(eventName, events[eventName]);
        });
    }

    _removeEvents() {
        const { events = {} } = this.props as P & { events: Record<string, () =>void> };

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

    private _componentDidUpdate(oldProps: P, newProps: P) {
        if (this.componentDidUpdate(oldProps, newProps)) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    // eslint-disable-next-line max-len
    protected componentDidUpdate(oldProps: P, newProps: P) { // eslint-disable-line @typescript-eslint/no-unused-vars
        console.log(oldProps, newProps);
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

    protected compile(template: (context: any) => string, context: any) {
        const contextAndStubs = { ...context };
    
        Object.entries(this.children).forEach(([name, component]) => {
          contextAndStubs[name] = `<div data-id='${component.id}'></div>`;
          if (Array.isArray(component)) {
            contextAndStubs[name] = component.map(
              (child) => `<div data-id='${child.id}'></div>`
            );
          } else {
            contextAndStubs[name] = `<div data-id='${component.id}'></div>`;
          }
        });
    
        const html = template(contextAndStubs);
    
        const temp = document.createElement('template');
    
        temp.innerHTML = html;
    
        const replaceStub = (component: Block) => {
          const stub = temp.content.querySelector(`[data-id='${component.id}']`);
    
          if (!stub) {
            return;
          }
    
          component.getContent()?.append(...Array.from(stub.childNodes));
    
          stub.replaceWith(component.getContent()!);
        };
    
        Object.entries(this.children).forEach(([_, component]) => {
          if (Array.isArray(component)) {
            component.forEach(replaceStub);
          } else {
            replaceStub(component);
          }
        });
    
        return temp.content;
    }

    protected render(): DocumentFragment {
        return new DocumentFragment();
    }

    getContent() {
        return this.element!;
    }

    _makePropsProxy(props: P) {
        const self = this;

        return new Proxy(props, {
            get(target, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target, prop: string, value) {
                const oldTarget = { ...target };

                target[prop as keyof P] = value; // eslint-disable-line no-param-reassign

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
