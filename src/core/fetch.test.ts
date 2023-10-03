import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import HTTPTransport from './Fetch';

describe('HTTPTransport', () => {
    let xhr: SinonFakeXMLHttpRequestStatic;
    let http: HTTPTransport;
    let requests: SinonFakeXMLHttpRequest[] = [];

    beforeEach(() => {
        xhr = sinon.useFakeXMLHttpRequest();

        (global as any).XMLHttpRequest = xhr;

        xhr.onCreate = ((request: SinonFakeXMLHttpRequest) => {
            requests.push(request);
        });

        http = new HTTPTransport();
    });

    afterEach(() => {
        requests = [];
    });

    it('.get() should send GET request', () => {
        http.get('https://example.com/test');

        const [request] = requests;

        expect(request.method).to.eq('GET');
    });
});

chai.use(sinonChai);

describe('HTTPTransport methods requests: ', () => {
    let request: HTTPTransport;

    beforeEach(() => {
        request = new HTTPTransport();
    });

    it('Method "get"', () => {
        const requestSpy = sinon.spy(request, 'request');
        request.get('https://example.com/test');

        expect(requestSpy).to.have.been
            .calledWith('https://example.com/test', { data: {}, timeout: 5000, method: 'GET' });
    });

    it('Method "post"', () => {
        const requestSpy = sinon.spy(request, 'request');
        request.post('https://example.com/test', { data: {} });

        expect(requestSpy).to.have.been
            .calledWith('https://example.com/test', { data: {}, method: 'POST' });
    });

    it('Method "put"', () => {
        const requestSpy = sinon.spy(request, 'request');
        request.put('https://example.com/test', { data: {} });

        expect(requestSpy).to.have.been
            .calledWith('https://example.com/test', { data: {}, method: 'PUT' });
    });

    it('Method "delete"', () => {
        const requestSpy = sinon.spy(request, 'request');
        request.delete('https://example.com/test', { data: {} });

        expect(requestSpy).to.have.been
            .calledWith('https://example.com/test', { data: {}, method: 'DELETE' });
    });
});
