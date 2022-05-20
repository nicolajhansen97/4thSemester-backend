"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPHeader = void 0;
const headerkey = 'x-access-token';
class HTTPHeader {
    static getToken(request) {
        return request.headers[headerkey];
    }
    static setToken(response, token) {
        return response.setHeader(headerkey, token);
    }
}
exports.HTTPHeader = HTTPHeader;
//# sourceMappingURL=HTTPHeader.js.map