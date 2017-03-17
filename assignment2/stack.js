"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Stack = (function () {
    function Stack(arr) {
        this.arr = arr || [];
    }
    /**
     * push
     */
    Stack.prototype.push = function (value) {
        this.arr.push(value);
    };
    /**
     * pop
     */
    Stack.prototype.pop = function () {
        return this.arr.pop();
    };
    /**
     * peek
     */
    Stack.prototype.peek = function () {
        return this.arr[this.arr.length - 1];
    };
    Object.defineProperty(Stack.prototype, "length", {
        /**
         * get length
         */
        get: function () {
            return this.arr.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * clean
     */
    Stack.prototype.clean = function () {
        this.arr = [];
    };
    return Stack;
}());
exports.Stack = Stack;
