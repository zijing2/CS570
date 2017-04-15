class treeNode {
    public childNodes = {
        A : null, B : null, C : null, D : null, E : null, F : null, G : null, H : null, I : null, J : null, K : null, L : null, M : null, N : null, O : null, P : null, R : null, S : null, T : null, U : null, V : null, W : null, X : null, Y : null, Z : null,
        a : null, b : null, c : null, d : null, e : null, f : null, g : null, h : null, i : null, j : null, k : null, l : null, m : null, n : null, o : null, p : null, r : null, s : null, t : null, u : null, v : null, w : null, x: null, y : null, z : null,
        ' ' : null
    };
    public val = null;
    public is_end = false;
    public hit_num = 0;

    constructor(val, is_end) {
        this.val = val;
        this.is_end = is_end;
    }
}

/**
 * tries
 */
export class tries {

    public root;

    public freq_table = [];

    public statistics = {};

    constructor() {
        this.root = new treeNode(null, false);
    }

    public insert(str : String){
        if(str.length==0){
            return;
        }
        var current = this.root;  
        var word='';     
        for(var i=0;i<str.length;i++){
            var c = str.charAt(i);
            word += c;
            if(current.childNodes[c]!=null){
                current = current.childNodes[c];
            }else{
                if(i==str.length-1){
                    var newNode = new treeNode(word, true);
                }else{
                    var newNode = new treeNode(word, false);
                }
                current.childNodes[c] = newNode;
                current = current.childNodes[c];
            }
        }
    }

    public getFreqTable(text : String){
        this.freq_table = [];
        for(var i=0;i<text.length;i++){
            this.freq_table[i] = new Array();
            this.freq_table[i].push(this.root);
        }
        for(var i=0;i<text.length;i++){
            for(var j=0;j<this.freq_table[i].length;j++){
                if(this.freq_table[i][j].childNodes[text.charAt(i)]!=null){
                    this.freq_table[i][j].childNodes[text.charAt(i)].hit_num ++;
                    if(i<text.length-1){
                        this.freq_table[i+1].push(this.freq_table[i][j].childNodes[text.charAt(i)]);
                    }
                }
            }
        }

        //console.log(this.root.childNodes.A);
        this.DFS(this.root);
        
    }

    public getRoot(){
        return this.root;
    }

    public output(){
        console.log(this.root);
    }

    public DFS(node : treeNode){
        var prop;
        if(node.is_end==true){
            this.statistics[node.val] = node.hit_num;
            //console.log(node.val +":"+ node.hit_num);
        }
        for(prop in node.childNodes){
            if(node.childNodes[prop]!=null){
                this.DFS(node.childNodes[prop]);
            }
        }
    }

    
}