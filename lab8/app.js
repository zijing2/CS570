"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("graceful-fs");
var graph_1 = require("./graph");
var input = fs.readFileSync('infile.dat', "utf8");
var input_arr = input.split("\n");
var nodes_edge_num = input_arr[0];
var nodes_num = input_arr[0].split(" ")[0];
var edges_num = input_arr[0].split(" ")[1];
input_arr.splice(0, 1);
var mapping = input_arr;
var myGraph = new graph_1.graph();
myGraph.createsGraph(nodes_num, edges_num, mapping);
var bfn = myGraph.Bfs(0);
for (var i in bfn) {
    console.log(i, bfn[i]);
}
