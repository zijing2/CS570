import rb = require( 'redblack.js' );

export class Dictionary{

    public rbtree;

    constructor(){
        this.rbtree = rb();
    }

    public insert(key : String, val : String){
        this.rbtree.add(key, val);
    }

    public retrieve(key : String) : String{
        return this.rbtree.getValue(key);
    }

    public deleteKey(key : String){
        this.rbtree.remove(key);
    }

    public hasKey(key : String) : boolean{
        console.log();
        return this.rbtree.getValue(key) != undefined;
    }

    // public test(){
    //     this.rbtree.add("test","test111");
    //     console.log(this.rbtree.getValue("test"));
    // }

}
