"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Measuerments = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    Treeno: { type: String, required: true },
    Barcode: { type: String, required: true },
    MeasuermentID: { type: String, required: true },
    Humidity: { type: Number, required: true },
    Temperature: { type: Number, required: true }
});
const Measuerments = (0, mongoose_1.model)('Product', ProductSchema);
exports.Measuerments = Measuerments;
//# sourceMappingURL=Measuerment.js.map