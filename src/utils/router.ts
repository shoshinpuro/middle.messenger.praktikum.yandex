/* eslint-disable no-underscore-dangle */
import Route from './route';
import { Block } from '../core/Block';

export interface BlockConstructable<P extends Record<string, any> = any> {
  new(props: P): Block<P>;
}

export class Router {
    private static __instance?: Router;

    private routes: Route[] = [];

    private _history = window.history;

    private _currentRoute: Route | null = null;

    constructor(private readonly _rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance; // eslint-disable-line no-constructor-return
        }

        this.routes = [];

        Router.__instance = this;
    }

    public use(pathname: string, block: BlockConstructable) {
        const route = new Route(pathname, block, this._rootQuery);
        this.routes.push(route);
        return this;
    }

    public start() {
        window.onpopstate = (event: PopStateEvent) => {
            const target = event.currentTarget as Window;
            this._onRoute(target.location.pathname);
        };
        this._onRoute(window.location.pathname);
    }

    private _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (!route) {
            console.log('ERROR'); // eslint-disable-line no-console
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }
        this._currentRoute = route;
        route.render();
    }

    public go(pathname: string) {
        this._history.pushState({}, '', pathname);

        this._onRoute(pathname);
    }

    public back() {
        this._history.back();
    }

    public forward() {
        this._history.forward();
    }

    private getRoute(pathname: string) {
        return this.routes.find((route) => route.match(pathname) || route.match(pathname.slice(1)));
    }

    public reset() {
        delete Router.__instance;
    
        new Router(this._rootQuery);
      }
}

const router = new Router('#app');
export default router;
