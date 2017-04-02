export class PriorityQueue<T>{

    private arr: T[];

    private compare : (e1 : T,e2 : T) => boolean; 

    private static defaultCompare(e1, e2): boolean{
        return e1.weight > e2.weight;
    }

    constructor(arr?: T[], compare = PriorityQueue.defaultCompare) {
        this.arr = arr || [];
        //we don't use the first space
        this.arr.push(null);
        this.compare = compare;
    }

    /**
     * isEmpty
     */
    public isEmpty(): Boolean {
        return this.arr.length==1;
    }

    /**
     * GetSize
     */
    public GetSize(): number {
        return this.arr.length-1;
    }

    /**
     * Insert
     */
    public Insert(value : T): void {
        this.arr[this.arr.length] = value;
        var pos = this.arr.length-1;
        while(this.findParentNode(pos)>=1){
            if(!this.compare(this.arr[pos],this.arr[this.findParentNode(pos)])){
                this.swap(pos,this.findParentNode(pos));
                pos = this.findParentNode(pos);
            }else{
                break;
            }
        }
    }

    /**
     * DeleteMin
     */
    public DeleteMin(): T {
        var rtn = this.arr[1];
        this.arr[1] = this.arr[this.arr.length-1];
        this.arr.splice(this.arr.length-1,1);
        var pos = 1;
        while(pos*2<=this.arr.length-1){
            if(this.arr.length===3){
                if(this.compare(this.arr[pos],this.arr[this.findLeftChildNode(pos)])){
                    this.swap(pos,this.findLeftChildNode(pos));
                    pos = this.findLeftChildNode(pos);  
                }
                break;
            }

            //find the smallest element among its two children
            if(this.findRightChildNode(pos)>this.arr.length-1){
                 if(this.compare(this.arr[pos],this.arr[this.findLeftChildNode(pos)])){
                        this.swap(pos,this.findLeftChildNode(pos));
                        pos = this.findLeftChildNode(pos);
                    }else{
                        break;
                    }
            } else{
                if(this.compare(this.arr[this.findLeftChildNode(pos)],this.arr[this.findRightChildNode(pos)])){
                    if(this.compare(this.arr[pos],this.arr[this.findRightChildNode(pos)])){
                        this.swap(pos,this.findRightChildNode(pos));
                        pos = this.findRightChildNode(pos);
                    }else{
                        break;
                    }
                }else{
                    if(this.compare(this.arr[pos],this.arr[this.findLeftChildNode(pos)])){
                        this.swap(pos,this.findLeftChildNode(pos));
                        pos = this.findLeftChildNode(pos);
                    }else{
                        break;
                    }
                }
            }
            

        }
        return rtn;
    }

    /**
     * swap
     */
    private swap(i : number , j : number) : void {
        var temp = this.arr[i];
        this.arr[i] = this.arr[j];
        this.arr[j] = temp;
    }

    /**
     * findParentNode
     */
    private findParentNode(i : number): number {
        return Math.floor(i/2);
    }

    /**
     * findLeftChildNode
     */
    private findLeftChildNode(i : number): number{
        return 2*i;
    }

    /**
     * findRightChildNode
     */
    private findRightChildNode(i : number): number{
        return 2*i+1;
    }

    public getArr(){
        return this.arr;
    }


    public output(){
        console.log(this.arr);
    }

}