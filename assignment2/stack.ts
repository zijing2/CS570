export class Stack<T>{

    private arr: T[];

    constructor(arr?: T[]) {
        this.arr = arr || [];
    }

    /**
     * push
     */
    public push(value: T) {
        this.arr.push(value);
    }

    /**
     * pop
     */
    public pop(): T {
        return this.arr.pop();
    }
    
    /**
     * peek
     */
    public peek(): T {
        return this.arr[this.arr.length - 1];
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
    
}