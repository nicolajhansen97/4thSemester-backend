"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractEndpoint = void 0;
const Guard_1 = require("../2_sessions/Guard");
class AbstractEndpoint {
    static produceResponse(successCode, minRole, resource, request, response) {
        const code = Guard_1.Guard.deny(request, minRole);
        if (code > 0)
            return response.status(code);
        // + for the parameters
        // + for data
        return response.status(successCode);
    }
}
exports.AbstractEndpoint = AbstractEndpoint;
//# sourceMappingURL=AbstractEndpoint.js.map