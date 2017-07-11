"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PriorityQueue = (function () {
    function PriorityQueue(arr, compare) {
        if (compare === void 0) { compare = PriorityQueue.defaultCompare; }
        this.arr = arr || [];
        //we don't use the first space
        this.arr.push(null);
        this.compare = compare;
    }
    PriorityQueue.defaultCompare = function (e1, e2) {
        return e1.weight > e2.weight;
    };
    /**
     * isEmpty
     */
    PriorityQueue.prototype.isEmpty = function () {
        return this.arr.length == 1;
    };
    /**
     * GetSize
     */
    PriorityQueue.prototype.GetSize = function () {
        return this.arr.length - 1;
    };
    /**
     * Insert
     */
    PriorityQueue.prototype.Insert = function (value) {
        this.arr[this.arr.length] = value;
        var pos = this.arr.length - 1;
        while (this.findParentNode(pos) >= 1) {
            if (!this.compare(this.arr[pos], this.arr[this.findParentNode(pos)])) {
                this.swap(pos, this.findParentNode(pos));
                pos = this.findParentNode(pos);
            }
            else {
                break;
            }
        }
    };
    /**
     * DeleteMin
     */
    PriorityQueue.prototype.DeleteMin = function () {
        var rtn = this.arr[1];
        this.arr[1] = this.arr[this.arr.length - 1];
        this.arr.splice(this.arr.length - 1, 1);
        var pos = 1;
        while (pos * 2 <= this.arr.length - 1) {
            if (this.arr.length === 3) {
                if (this.compare(this.arr[pos], this.arr[this.findLeftChildNode(pos)])) {
                    this.swap(pos, this.findLeftChildNode(pos));
                    pos = this.findLeftChildNode(pos);
                }
                break;
            }
            //find the smallest element among its two children
            if (this.findRightChildNode(pos) > this.arr.length - 1) {
                if (this.compare(this.arr[pos], this.arr[this.findLeftChildNode(pos)])) {
                    this.swap(pos, this.findLeftChildNode(pos));
                    pos = this.findLeftChildNode(pos);
                }
                else {
                    break;
                }
            }
            else {
                if (this.compare(this.arr[this.findLeftChildNode(pos)], this.arr[this.findRightChildNode(pos)])) {
                    if (this.compare(this.arr[pos], this.arr[this.findRightChildNode(pos)])) {
                        this.swap(pos, this.findRightChildNode(pos));
                        pos = this.findRightChildNode(pos);
                    }
                    else {
                        break;
                    }
                }
                else {
                    if (this.compare(this.arr[pos], this.arr[this.findLeftChildNode(pos)])) {
                        this.swap(pos, this.findLeftChildNode(pos));
                        pos = this.findLeftChildNode(pos);
                    }
                    else {
                        break;
                    }
                }
            }
        }
        return rtn;
    };
    /**
     * swap
     */
    PriorityQueue.prototype.swap = function (i, j) {
        var temp = this.arr[i];
        this.arr[i] = this.arr[j];
        this.arr[j] = temp;
    };
    /**
     * findParentNode
     */
    PriorityQueue.prototype.findParentNode = function (i) {
        return Math.floor(i / 2);
    };
    /**
     * findLeftChildNode
     */
    PriorityQueue.prototype.findLeftChildNode = function (i) {
        return 2 * i;
    };
    /**
     * findRightChildNode
     */
    PriorityQueue.prototype.findRightChildNode = function (i) {
        return 2 * i + 1;
    };
    PriorityQueue.prototype.getArr = function () {
        return this.arr;
    };
    PriorityQueue.prototype.output = function () {
        console.log(this.arr);
    };
    return PriorityQueue;
}());
exports.PriorityQueue = PriorityQueue;
