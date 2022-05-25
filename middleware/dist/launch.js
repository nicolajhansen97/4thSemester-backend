"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = require("./0_routes/routes");
const WebSocketServer_1 = require("./0_routes/WebSocketServer");
const port = 3000;
const port2 = 3001;
const server2 = routes_1.routes.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('This server is listening at port:' + port);
}));
const webServer = WebSocketServer_1.server.listen(process.env.PORT || port2, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server started on port 3001`);
}));
//# sourceMappingURL=launch.js.map