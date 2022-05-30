"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: false },
    telephone: { type: String, required: false },
    userStatus: { type: Boolean, required: false }
});
const User = (0, mongoose_1.model)('User', UserSchema);
exports.User = User;
//# sourceMappingURL=User.js.map