"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BiddedProduct = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    timeStamp: { type: Date, required: true },
    userID: { type: String, required: true },
    ProductID: { type: String, required: true }
});
const BiddedProduct = (0, mongoose_1.model)('BiddedProduct', ProductSchema);
exports.BiddedProduct = BiddedProduct;
//# sourceMappingURL=BiddedProducts.js.map