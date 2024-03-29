import queryStringify, { TStringIndexed } from '../utils/queryStringify';

const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};
interface IOptions {
    data: TStringIndexed;
    method?: string;
    headers?: { [key: string]: string };
    timeout?: number;
}
type THTTPMethod = (url: string, options?: IOptions) => Promise<unknown>;

export default class HTTPTransport { // eslint-disable-line @typescript-eslint/no-unused-vars
    get: THTTPMethod = (url, options = {
        data: {},
        timeout: 5000,
        method: METHODS.GET,
    }) => this.request(url + queryStringify(options.data), { ...options, method: METHODS.GET });

    post: THTTPMethod = (url, options = {
        data: {},
        timeout: 5000,
        method: METHODS.POST,
    }) => this.request(url, { ...options, method: METHODS.POST });

    put: THTTPMethod = (url, options = {
        data: {},
        timeout: 5000,
        method: METHODS.PUT,
    }) => this.request(url, { ...options, method: METHODS.PUT });

    delete: THTTPMethod = (url, options = {
        data: {},
        timeout: 5000,
        method: METHODS.DELETE,
    }) => this.request(url, { ...options, method: METHODS.DELETE });

    request = ( // eslint-disable-line class-methods-use-this
        url: string,
        options: IOptions,
        timeout = 5000,
    ) => {
        const { headers = {}, method, data } = options;

        return new Promise((resolve, reject) => {
            if (!method) {
                throw new Error('No method');
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.open(
                method,
                url,
            );

            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status < 400) {
                        resolve(xhr.response);
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function () { //  eslint-disable-line func-names
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;
            xhr.withCredentials = true;
            xhr.responseType = 'json';

            if (isGet || !data) {
                xhr.send();
            } else if (data instanceof FormData) {
                xhr.send(data);
            } else {
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify(data));
            }
        });
    };
}
