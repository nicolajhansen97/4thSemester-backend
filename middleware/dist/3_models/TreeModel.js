"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeModel = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    No: { type: String, required: true },
    TreeType: { type: String, required: true },
    HumidityMin: { type: Number, required: true },
    HumidityMax: { type: Number, required: true },
    TempMin: { type: Number, required: true },
    TempMax: { type: Number, required: true },
    UserId: { type: String, required: true },
    BarCode: { type: String, required: true }
});
const TreeModel = (0, mongoose_1.model)('TreeModel', ProductSchema);
exports.TreeModel = TreeModel;
//# sourceMappingURL=TreeModel.js.map