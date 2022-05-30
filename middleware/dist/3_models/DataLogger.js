"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataLogger = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    Barcode: { type: String, required: true },
    RaspberryVer: { type: String, required: true },
    Woring: { type: Boolean, required: true }
});
const DataLogger = (0, mongoose_1.model)('Product', ProductSchema);
exports.DataLogger = DataLogger;
//# sourceMappingURL=DataLogger.js.map