import fs = require('graceful-fs');
import {graph} from './graph';

var input = fs.readFileSync('infile.dat', "utf8");

var input_arr = input.split("\n");
var nodes_edge_num = input_arr[0];
var nodes_num = input_arr[0].split(" ")[0];
var edges_num = input_arr[0].split(" ")[1];
input_arr.splice(0,1);
var mapping = input_arr;

var myGraph = new graph();
myGraph.createsGraph(nodes_num,edges_num,mapping);

var bfn = myGraph.Bfs(0);

for(let i in bfn){
    console.log(i, bfn[i]);
}





