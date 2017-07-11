"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var queue_1 = require("./queue");
var graph = (function () {
    function graph() {
        this.V = [];
        this.Adjacency_Matrix = [];
    }
    graph.prototype.createsGraph = function (nodes_num, edges_num, mapping) {
        for (var i = 0; i < nodes_num; i++) {
            this.V[i] = i;
            this.Adjacency_Matrix[i] = [];
            for (var j = 0; j < nodes_num; j++) {
                this.Adjacency_Matrix[i][j] = -1;
            }
        }
        for (var num in mapping) {
            var edge_end_node_1 = mapping[num].split(" ")[0];
            var edge_end_node_2 = mapping[num].split(" ")[1];
            this.Adjacency_Matrix[edge_end_node_1][edge_end_node_2] = 1;
            this.Adjacency_Matrix[edge_end_node_2][edge_end_node_1] = 1;
        }
        //console.log(this.Adjacency_Matrix);
    };
    graph.prototype.isGraphEmpty = function (graph) {
        var count = 0;
        for (var i in graph) {
            count++;
        }
        if (count == 0) {
            return true;
        }
        else {
            return false;
        }
    };
    /*
    * Breadth First Search
    */
    graph.prototype.Bfs = function (s) {
        var S_Prime = new queue_1.Queue();
        var bfn = {};
        S_Prime.enqueue(s);
        for (var v_1 in this.V) {
            bfn[v_1] = 0;
        }
        var i = 0, v = s;
        //Make all E "unused" ( used: 0, unused: 1, disconnected: -1)
        while (S_Prime.length != 0) {
            v = S_Prime.dequeue();
            i++;
            bfn[v] = i;
            var v_unused_edges = this.getVUnusedEdges(v);
            for (var k = 0; k < v_unused_edges.length; k++) {
                if (bfn[v_unused_edges[k]] == 0) {
                    if (!S_Prime.contains(v_unused_edges[k])) {
                        S_Prime.enqueue(v_unused_edges[k]);
                    }
                }
            }
        }
        return bfn;
    };
    graph.prototype.getVUnusedEdges = function (v) {
        var v_unused_edges = [];
        for (var i = 0; i < this.V.length; i++) {
            if (this.Adjacency_Matrix[v][i] == 1) {
                v_unused_edges.push(i);
                this.Adjacency_Matrix[v][i] = 0;
                this.Adjacency_Matrix[i][v] = 0;
            }
        }
        return v_unused_edges;
    };
    return graph;
}());
exports.graph = graph;
