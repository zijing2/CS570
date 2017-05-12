"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("./router");
var fs = require("graceful-fs");
var prompt_f = require("prompt-sync");
var prompt = prompt_f();
var app = (function () {
    function app() {
    }
    app.main = function () {
        this.initRoutersByFile();
        //this.routers[2].status = "stop";
        while (true) {
            console.log("\n C : continue\n Q : quit\n P followed by the routers id number: print the routing table of a router\n S followed by the id number: shut down a router\n T followed by the id : start up a router\n please enter your choose:");
            var p = prompt('');
            if (p.toLowerCase() == "c") {
                for (var i = 0; i < 2; i++) {
                    for (var prop in this.routers) {
                        this.routers[prop].originatePacket();
                    }
                }
            }
            else if (p.toLowerCase() == "q") {
                break;
            }
            else if (p.charAt(0).toLowerCase() == "p") {
                if (app.routers[p.charAt(1)].status == "start") {
                    console.log(app.routers[p.charAt(1)].routing_table);
                }
                else {
                    console.log(p + " is shutdown now");
                }
            }
            else if (p.charAt(0).toLowerCase() == "s") {
                app.routers[p.charAt(1)].status = "stop";
            }
            else if (p.charAt(0).toLowerCase() == "t") {
                app.routers[p.charAt(1)].status = "start";
            }
        }
    };
    /*
    * parse input and init routers
    */
    app.initRoutersByFile = function () {
        var input = fs.readFileSync("infile.dat", "utf8");
        var input_arr = input.split("\n");
        var new_router;
        for (var i in input_arr) {
            var input_line = input_arr[i];
            var input_line_arr = input_arr[i].split(/\s+/);
            if (input_line_arr[0] !== '') {
                new_router = new router_1.router();
                new_router.id = input_line_arr[0];
                new_router.network = input_line_arr[1];
                if (input_line_arr[2] != undefined) {
                    new_router.network_cost = input_line_arr[2];
                }
                else {
                    new_router.network_cost = 1;
                }
                this.routers[new_router.id] = new_router;
            }
            else {
                if (input_line_arr[2] != undefined) {
                    this.routers[new_router.id].connected_routers_list[input_line_arr[1]] = input_line_arr[2];
                }
                else {
                    this.routers[new_router.id].connected_routers_list[input_line_arr[1]] = 1;
                }
            }
        }
    };
    return app;
}());
app.routers = {};
exports.app = app;
app.main();
//# sourceMappingURL=app.js.map