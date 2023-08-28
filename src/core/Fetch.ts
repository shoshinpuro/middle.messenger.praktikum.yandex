import queryStringify from "../utils/queryStringify";

const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};
interface Options {
    data: any;
    method: string;
    headers?: object;
    timeout: number;
}
type HTTPMethod = (url: string, options?: Options) => Promise<unknown>;

export default class HTTPTransport { // eslint-disable-line @typescript-eslint/no-unused-vars
    get: HTTPMethod = (url, options = {
        data: {},
        timeout: 5000,
        method: METHODS.GET,
    }) => {
        options.data = queryStringify(options.data);// eslint-disable-line no-param-reassign
        return this.request(url + queryStringify(options.data), { ...options }, options.timeout);
    };

    post: HTTPMethod = (url, options = {
        data: {},
        timeout: 5000,
        method: METHODS.POST,
    }) => this.request(url, { ...options }, options.timeout);

    put: HTTPMethod = (url, options = {
        data: {},
        timeout: 5000,
        method: METHODS.PUT,
    }) => this.request(url, { ...options }, options.timeout);

    delete: HTTPMethod = (url, options = {
        data: {},
        timeout: 5000,
        method: METHODS.DELETE,
    }) => this.request(url, { ...options }, options.timeout);

    request = ( // eslint-disable-line class-methods-use-this
        url: string,
        options: Options,
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
                isGet && !!data
                    ? `${url}${queryStringify(data)}`
                    : url,
            );

            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, (headers as any)[(key as any)]);
            });

            xhr.onload = function () { //  eslint-disable-line func-names
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}
