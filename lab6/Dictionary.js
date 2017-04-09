"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rb = require('redblack.js');
var Dictionary = (function () {
    function Dictionary() {
        this.rbtree = rb();
    }
    Dictionary.prototype.insert = function (key, val) {
        this.rbtree.add(key, val);
    };
    Dictionary.prototype.retrieve = function (key) {
        return this.rbtree.getValue(key);
    };
    Dictionary.prototype.deleteKey = function (key) {
        this.rbtree.remove(key);
    };
    Dictionary.prototype.hasKey = function (key) {
        console.log();
        return this.rbtree.getValue(key) != undefined;
    };
    return Dictionary;
}());
exports.Dictionary = Dictionary;
