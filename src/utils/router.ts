import Route from './route';
import Block from './../core/Block';

export default class Router {
    private static __instance: Router;
    private routes: Route[] = [];
    private _history = window.history;
    private _currentRoute: Route | null = null;

    constructor(private readonly _rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        Router.__instance = this;
    }

    public use(pathname: string, block: typeof Block) {
        const route = new Route(pathname, block, this._rootQuery);
        console.log(this._rootQuery);
        this.routes.push(route);
        return this;
    }

    start() {
        window.onpopstate = (event: PopStateEvent) => {
            const target = event.currentTarget as Window;
            this._onRoute(target.location.pathname);
        };
        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        console.log(pathname);
        console.log(route);
        console.log(this.routes);
        if (!route) {
            console.log("ERROR")
            return;
        }

        if (this._currentRoute) {
            this._currentRoute.leave();
        }
        this._currentRoute = route;
        route.render();
    }

    go(pathname: string) {
        this._history.pushState({}, '', pathname);

        this._onRoute(pathname);
    }

    back() {
        this._history.back();
    }

    forward() {
        this._history.forward();
    }

    getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname) || route.match(pathname.slice(1)));
    }
}
