"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
* shortest path first algorithm (thanks to Dijkstra)
*/
var SPF = (function () {
    function SPF() {
    }
    SPF.init = function (s, adjacent_list) {
        //console.log(s,adjacent_list);
        this.s = s;
        this.adjacent_list = adjacent_list;
        this.S = {};
        this.VS = {};
        this.D = {};
        this.outgoing_link = {};
        for (var i in this.adjacent_list) {
            if (i == s) {
                this.S[i] = 1;
            }
            else {
                this.VS[i] = 1;
                if (this.adjacent_list[s] != undefined) {
                    if (this.adjacent_list[s][i] == undefined) {
                        this.D[i] = Number.MAX_VALUE;
                    }
                    else {
                        if (typeof this.adjacent_list[s][i] == "number") {
                            this.D[i] = this.adjacent_list[s][i];
                        }
                        else {
                            this.D[i] = parseInt(this.adjacent_list[s][i]);
                        }
                    }
                    this.outgoing_link[i] = [s, i];
                }
            }
        }
        //console.log(this.s,this.D);
    };
    SPF.computeSPF = function () {
        if (Object.getOwnPropertyNames(this.D).length != 0) {
            while (Object.getOwnPropertyNames(this.VS).length != 0) {
                var v = this.selectMinDFromVS();
                delete this.VS[v];
                this.S[v] = 1;
                for (var w in this.VS) {
                    var cost_v_w;
                    if (this.adjacent_list[v] == undefined) {
                        cost_v_w = Number.MAX_VALUE;
                    }
                    else {
                        if (this.adjacent_list[v][w] == undefined) {
                            cost_v_w = Number.MAX_VALUE;
                        }
                        else {
                            if (typeof this.adjacent_list[v][w] == "number") {
                                cost_v_w = this.adjacent_list[v][w];
                            }
                            else {
                                cost_v_w = parseInt(this.adjacent_list[v][w]);
                            }
                        }
                    }
                    if (typeof this.D[w] != "number") {
                        this.D[w] = parseInt(this.D[w]);
                    }
                    if (typeof this.D[v] != "number") {
                        this.D[v] = parseInt(this.D[v]);
                    }
                    if (this.D[v] + cost_v_w < this.D[w]) {
                        //console.log("change:",w,this.outgoing_link[w],this.outgoing_link[v],this.D[v],cost_v_w,this.D[w]);
                        this.outgoing_link[w] = [];
                        for (var j = 0; j < this.outgoing_link[v].length; j++) {
                            this.outgoing_link[w].push(this.outgoing_link[v][j]);
                        }
                        this.outgoing_link[w].push(w);
                    }
                    this.D[w] = Math.min(this.D[w], this.D[v] + cost_v_w);
                }
            }
        }
        //console.log(this.s,this.D);
        //console.log(this.s,this.outgoing_link);
    };
    /*
    *   select a node v in V-S such that D[v] is a minimum;
    */
    SPF.selectMinDFromVS = function () {
        var minVex = null;
        for (var i in this.VS) {
            if (minVex == null) {
                minVex = i;
            }
            else {
                if (typeof this.D[i] != "number") {
                    this.D[i] = parseInt(this.D[i]);
                }
                if (typeof this.D[minVex] != "number") {
                    this.D[minVex] = parseInt(this.D[minVex]);
                }
                if (this.D[i] < this.D[minVex]) {
                    minVex = i;
                }
            }
        }
        return minVex;
    };
    return SPF;
}());
SPF.adjacent_list = {};
SPF.S = {}; //a set S of selected nodes whose shortest distance from the source is already known
SPF.VS = {};
SPF.D = {};
SPF.outgoing_link = {};
exports.SPF = SPF;
//# sourceMappingURL=spf.js.map