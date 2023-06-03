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
};
type HTTPMethod = (url: string, options?: Options) => Promise<unknown>
type heDaders = {x: string };
function queryStringify(data: any) {
    if (typeof data !== 'object') {
        throw new Error('Data must be object');
    }
    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
}

class HTTPTransport {
    get: HTTPMethod = (url, options = {data: {}, timeout: 5000, method: METHODS.GET}) => {
        options.data = queryStringify(options.data);
        return this.request(url+queryStringify(options.data), {...options}, options.timeout);
    };

    post: HTTPMethod = (url, options= {data: {}, timeout: 5000, method: METHODS.POST}) => {
        return this.request(url, {...options}, options.timeout);
    };

    put: HTTPMethod = (url, options = {data: {}, timeout: 5000, method: METHODS.PUT}) => {
            return this.request(url, {...options}, options.timeout);
    };

    delete: HTTPMethod = (url, options = {data: {}, timeout: 5000, method: METHODS.DELETE}) => { 
            return this.request(url, {...options}, options.timeout);
    };
    
    request = (url: string, options: Options, timeout = 5000) => {
            const {headers = {}, method, data} = options;

            return new Promise(function(resolve, reject) {
                    if (!method) {
                        reject('No method');
                        return;
                    }

                const xhr = new XMLHttpRequest();
                    const isGet = method === METHODS.GET;

                xhr.open(
                    method, 
                    isGet && !!data
                        ? `${url}${queryStringify(data)}`
                        : url,
                );
           
                Object.keys(headers).forEach(key => {
                        xhr.setRequestHeader(key, (headers as any)[(key as any)] );
                });
            
                xhr.onload = function() {
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
