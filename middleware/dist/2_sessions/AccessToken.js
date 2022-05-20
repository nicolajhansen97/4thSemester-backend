"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const expiresIn = '2h';
const maxAttempts = 3;
class AccessToken {
    // (1) Create an ACCESS TOKEN (with JWT) containing the user ROLE
    static generateToken(role) {
        const token = jsonwebtoken_1.default.sign({ 'role': role }, process.env.TOKEN_SECRET, { expiresIn });
        console.log(token);
        return token;
    }
    // (2) Read the user role from the ACCESS TOKEN
    static userRole(token) {
        const decodedToken = (0, jwt_decode_1.default)(token);
        console.log(decodedToken.role);
        return decodedToken.role;
    }
    // (3) Create a new login token (with JWT) setting the attempt counter to 1
    static generateNewAttemptToken() {
        const token = jsonwebtoken_1.default.sign({ 'counter': 1 }, process.env.TOKEN_SECRET, { expiresIn });
        return token;
    }
    // (4) Evaluate the current number of attempts from the ACCESS TOKEN
    static canRetryLogin(token) {
        const decodedToken = (0, jwt_decode_1.default)(token);
        const numberOfAttempts = decodedToken.counter;
        console.log("number of attempts " + numberOfAttempts + " max number of attempts " + maxAttempts);
        if (numberOfAttempts >= maxAttempts)
            return false;
        return true;
    }
    // (5)
    static updateNumberOfAttempts(token) {
        const decodedToken = (0, jwt_decode_1.default)(token);
        let numberOfAttempts = decodedToken.counter;
        numberOfAttempts = numberOfAttempts + 1;
        return jsonwebtoken_1.default.sign({ 'counter': numberOfAttempts }, process.env.TOKEN_SECRET, { expiresIn });
    }
}
exports.AccessToken = AccessToken;
//# sourceMappingURL=AccessToken.js.map