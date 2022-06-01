"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataLogger = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    BarCode: { type: String, required: true },
    RaspberryVer: { type: String, required: true },
    Working: { type: Boolean, required: true }
});
const DataLogger = (0, mongoose_1.model)('DataLoggers', ProductSchema);
exports.DataLogger = DataLogger;
//# sourceMappingURL=DataLogger.js.map