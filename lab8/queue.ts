export class Queue<T>{

    private arr: T[];

    constructor(arr?: T[]) {
        this.arr = arr || [];
    }

    /**
     * enqueue
     */
    public enqueue(value: T) {
        this.arr.push(value);
    }

    /**
     * dequeue
     */
    public dequeue(): T {
        return this.arr.shift();
    }
    
    /**
     * peek
     */
    public peek(): T {
        return this.arr[0];
    }

    /**
     * get length
     */
    public get length() {
        return this.arr.length;
    }

    /**
     * clean
     */
    public clean() {
        this.arr = [];
    }

    /*
    *  contains element s
    */
    public contains(s){
        for(let i=0;i<this.arr.length;i++){
            if(this.arr[i]===s){
                return true;
            }
        }
        return false;
    }
    
}