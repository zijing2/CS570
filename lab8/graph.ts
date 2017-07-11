import {Queue} from './queue';

export class graph{

    public Adjacency_Matrix;

    public V = [];

    constructor (){
        this.Adjacency_Matrix = [];
    }

    public createsGraph(nodes_num, edges_num, mapping){

        for(var i=0;i<nodes_num;i++){
            this.V[i] = i;
            this.Adjacency_Matrix[i] = [];
            for(var j=0;j<nodes_num;j++){
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
    }

    private isGraphEmpty(graph){
        var count = 0;
        for(var i in graph){
            count++;
        }
        if(count==0){
            return true;
        }else{
            return false;
        }
    }

    /*
    * Breadth First Search
    */
    public Bfs(s){
        var S_Prime = new Queue();
        var bfn = {};
        S_Prime.enqueue(s);
        for(let v in this.V){
            bfn[v] = 0;
        }
        var i = 0, v = s;
        //Make all E "unused" ( used: 0, unused: 1, disconnected: -1)
        while(S_Prime.length!=0){
            v = S_Prime.dequeue();
            i++;
            bfn[v] = i;
            var v_unused_edges = this.getVUnusedEdges(v);
            for(let k=0;k<v_unused_edges.length;k++){
                if(bfn[v_unused_edges[k]] == 0){
                    if(!S_Prime.contains(v_unused_edges[k])){
                        S_Prime.enqueue(v_unused_edges[k]);
                    }
                }
            }
        }
        return bfn;
    }

    private getVUnusedEdges(v){
        var v_unused_edges = [];
        for(let i=0;i<this.V.length;i++){
            if(this.Adjacency_Matrix[v][i] == 1){
                v_unused_edges.push(i);
                this.Adjacency_Matrix[v][i] = 0;
                this.Adjacency_Matrix[i][v] = 0;
            }
        }
        return v_unused_edges;
    }

}