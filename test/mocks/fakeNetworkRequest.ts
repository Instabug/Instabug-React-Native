import type { Interceptor, ReplyHeaders } from 'nock';

let xhr: XMLHttpRequest;

export default {
  open(method: string, url: string) {
    xhr = new global.XMLHttpRequest();
    xhr.open(method, url);
  },
  send(data?: any) {
    xhr.send(data);
  },
  setRequestHeaders(headers: Record<string, string>) {
    for (let i = 0; i < Object.keys(headers).length; i++) {
      const key = Object.keys(headers)[i];
      xhr.setRequestHeader(key, headers[key]);
    }
  },
  setResponseType(type: XMLHttpRequestResponseType) {
    xhr.responseType = type;
  },
  mockHasError() {
    // @ts-ignore
    xhr._hasError = true;
  },
  mockXHRStatus(status: number | null) {
    // @ts-ignore
    xhr.status = status;
  },
  mockResponse(
    request: Interceptor,
    status: number = 200,
    body: string | Buffer = 'ok',
    headers: ReplyHeaders = {},
  ) {
    request.once().reply(status, body, headers);
  },
};
