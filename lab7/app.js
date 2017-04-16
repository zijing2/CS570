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
var DG = new graph_1.graph();
DG.createsGraph(nodes_num, edges_num, mapping);
try {
    var topological_talbe1 = DG.topological1();
    var topological_talbe2 = DG.topological2();
    console.log(topological_talbe1);
    console.log(topological_talbe2);
}
catch (error) {
    console.log(error);
}
// console.log(nodes_num,edges_num,mapping);
