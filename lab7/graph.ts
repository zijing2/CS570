export class graph{

    public Adjacency_List;

    constructor (){
        this.Adjacency_List = {};
    }

    public createsGraph(nodes_num, edges_num, mapping){
        //console.log(nodes_num);
        for(var i=0;i<nodes_num;i++){
            this.Adjacency_List[i] = [];
        }
        for (var j in mapping) {
            var edge_end_node_1 = mapping[j].split(" ")[0];
            var edge_end_node_2 = mapping[j].split(" ")[1];
            //console.log(this.Adjacency_List[edge_end_node_1]);
            this.Adjacency_List[edge_end_node_1].push(edge_end_node_2);
        }
    }

    public topological1(){
        var graph = {};
        for(var i in this.Adjacency_List){
            graph[i] = this.Adjacency_List[i];
        }
        var topological_table = [null];
        var topological_index = 0;
        while(!this.isGraphEmpty(graph)){
            var in_degree_table = {};
            var set_of_node_u_degree_zero = [];
            //init in_degree_table
            for(var i in graph){
                    in_degree_table[i] = 0;
            }
            for(var i in graph){
                for(var j in graph[i]){
                    in_degree_table[graph[i][j]] ++;
                }
            }
            //find set of nodes whose in_degree=0
            for(var i in in_degree_table){
                if(in_degree_table[i]===0){
                    set_of_node_u_degree_zero.push(i); 
                }
            }
            if(set_of_node_u_degree_zero.length==0){
                throw "this Graph is not acyclic";
            }
            topological_index++;
            //select the last node in set_of_node_u_degree_zero
            topological_table[topological_index] = set_of_node_u_degree_zero[set_of_node_u_degree_zero.length-1];
            //console.log(set_of_node_u_degree_zero[set_of_node_u_degree_zero.length-1]);
            //delete node u;  (of course all arcs directed out of u as well)
            delete(graph[set_of_node_u_degree_zero[set_of_node_u_degree_zero.length-1]]);
            for(var i in graph){
                for(var j in graph[i]){
                    if(graph[i][j] === set_of_node_u_degree_zero[set_of_node_u_degree_zero.length-1]){
                        graph[i].splice(j,1);
                    }
                }
            }
        }
        return topological_table;
    }

    public topological2(){
        var graph = {};
        for(var i in this.Adjacency_List){
            graph[i] = this.Adjacency_List[i];
        }
        var topological_table = [null];
        var topological_index = 0;
        while(!this.isGraphEmpty(graph)){
            var in_degree_table = {};
            var set_of_node_u_degree_zero = [];
            //init in_degree_table
            for(var i in graph){
                    in_degree_table[i] = 0;
            }
            for(var i in graph){
                for(var j in graph[i]){
                    in_degree_table[graph[i][j]] ++;
                }
            }
            //find set of nodes whose in_degree=0
            for(var i in in_degree_table){
                if(in_degree_table[i]===0){
                    set_of_node_u_degree_zero.push(i); 
                }
            }
            if(set_of_node_u_degree_zero.length==0){
                throw "this Graph is not acyclic";
            }
            topological_index++;
            //select the first node in set_of_node_u_degree_zero
            topological_table[topological_index] = set_of_node_u_degree_zero[0];
            //delete node u;  (of course all arcs directed out of u as well)
            delete(graph[set_of_node_u_degree_zero[0]]);
            for(var i in graph){
                for(var j in graph[i]){
                    if(graph[i][j] === set_of_node_u_degree_zero[0]){
                        graph[i].splice(j,1);
                    }
                }
            }
        }
        return topological_table;
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

}