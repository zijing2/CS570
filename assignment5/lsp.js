"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuidV4 = require("uuid/v4");
var LSP = (function () {
    function LSP() {
        this.id = uuidV4();
        this.router_id = null;
        this.sequence = null;
        this.TTL = 10;
        this.list = null;
        this.send_from = null;
    }
    return LSP;
}());
exports.LSP = LSP;
//# sourceMappingURL=lsp.js.map