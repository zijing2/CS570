import { PriorityQueue } from './PQ';
// import { getFileAsStringSync } from './data/fileData';
import fs = require('fs');

class symbol_info {
    public  symbol;
    public  frequency;

    constructor(s,f){
        this.symbol = s;
        this.frequency = f;
    }
}

class tree_node {
    public leftchild
    public rightchild
    public parent
    public symbol_info : symbol_info;

    constructor(l,r,p,s){
        this.leftchild = l;
        this.rightchild = r;
        this.parent = p;
        this.symbol_info = s;
    } 
}

class HaffmanCode{

    public static huff_code_table={};
    public static total_bits=0;
    public static total_string=0;

    public static main(){
    //var input = getFileAsStringSync('infile.dat');
    var input = fs.readFileSync('infile.dat', "utf8");
    input = input.replace(/\W/g,"");
    this.total_string = input.split("").length;
    var pq = new PriorityQueue <tree_node> ([],(e1, e2)=>{return e1.symbol_info.frequency > e2.symbol_info.frequency;});
    var map = {};
    var Alphabet = [];
    var output;

    for(var i=0;i<input.length;i++){
        var char = input[i];
        if(map[char]==null){
            map[char] = 1;
        }else{
            map[char]++;
        }
    }

    var freq_table = [];
    for(var prop in map){
        var sym = new symbol_info(prop,map[prop]);    
        var treeNode = new tree_node(null,null,null,sym);
        pq.Insert(treeNode);
        freq_table.push(sym);
    }

    //freq table sort by freq
    freq_table.sort((a : symbol_info,b : symbol_info)=>{
        if(a.frequency>b.frequency){
            return -1;
        }else if(a.frequency==b.frequency){
            return 0;
        }else{
            return 1;
        }
    });

    //construct Haffman tree
    while(pq.GetSize()>1){
        var least = pq.DeleteMin();
        var second = pq.DeleteMin();
        var sym = new symbol_info(null, least.symbol_info.frequency + second.symbol_info.frequency);
        var new_tree_node = new tree_node(least,second,null,sym);
        least.parent = new_tree_node;
        second.parent = new_tree_node;
        pq.Insert(new_tree_node);
    }

    //pq.output();
    var root = pq.getArr()[1];

    //DFS
    this.DFS(root,"");

    //Render
    console.log(this.total_string);
    var output_string = "";
    //console.log("Symbol|frequency|Huffman Codes");
    output_string = "Symbol|frequency|Huffman Codes\n";
    for(var i=0;i<freq_table.length;i++){
        this.total_bits = this.total_bits + (freq_table[i].frequency * this.huff_code_table[freq_table[i].symbol].split("").length);
        //console.log(freq_table[i].symbol+"|"+ parseFloat((freq_table[i].frequency/this.total_string).toFixed(4))*100 + "%" +"|"+this.huff_code_table[freq_table[i].symbol]);
        output_string+=freq_table[i].symbol+'|'+ parseFloat((freq_table[i].frequency/this.total_string).toFixed(4))*100 + '%' +'|'+this.huff_code_table[freq_table[i].symbol]+"\n";
    }
    //console.log("Total Bits:" + this.total_bits);
    output_string += "Total Bits:" + this.total_bits;
    fs.writeFileSync("outfile.dat",output_string);
    
    //console.log(freq_table,this.huff_code_table);
}

public static DFS(root : tree_node, path: string){
    if(root.leftchild==null && root.rightchild==null){
        //leave
        //console.log(root.symbol_info.symbol + "|" + root.symbol_info.frequency + "|" + path );
        this.huff_code_table[root.symbol_info.symbol] = path;
        return;
    }else if(root.leftchild!=null && root.rightchild==null){
        this.DFS(root.leftchild, path + "0");
    }else if(root.leftchild==null && root.rightchild!=null){
        this.DFS(root.rightchild,path + "1");
    }else{
        this.DFS(root.leftchild, path + "0");
        this.DFS(root.rightchild,path + "1");
    }   
}

}

HaffmanCode.main();