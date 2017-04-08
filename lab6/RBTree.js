"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TreeNode = (function () {
    function TreeNode(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
    return TreeNode;
}());
var RBTree = (function () {
    function RBTree() {
    }
    /**
     * insert
     */
    RBTree.prototype.insert = function (val) {
        var current = this.root;
        while (current != null) {
            if (current.val == val) {
                return;
            }
            else if (val < current.val) {
                if (current.left == null) {
                    current.left = new TreeNode(val);
                    return;
                }
                else {
                    current = current.left;
                }
            }
            else {
                if (current.right == null) {
                    current.right = new TreeNode(val);
                    return;
                }
                else {
                    current = current.right;
                }
            }
        }
        this.root = new TreeNode(val);
        return;
    };
    /**
     * delete
     */
    RBTree.prototype.delete = function (val) {
        var current = this.root;
        var parent = null;
        var direction;
        while (current != null) {
            if (current.val == val) {
                //Node X is leaf
                if (current.left == null && current.right == null) {
                    parent[direction] = null;
                    return;
                }
                else if ((current.left == null && current.right != null) || (current.left != null && current.right == null)) {
                    //Node X at most one child
                    if (current == this.root) {
                        if (current.left != null) {
                            this.root = current.left;
                            return;
                        }
                        else {
                            this.root = current.right;
                            return;
                        }
                    }
                    else {
                        if (current.left != null) {
                            parent[direction] = current.left;
                            return;
                        }
                        else {
                            parent[direction] = current.right;
                            return;
                        }
                    }
                }
                else {
                    //Node X has both, the left and right children
                    //use method 1: pull the largest element of left Node to current
                    var c = current.left;
                    if (c.right == null) {
                        c.right = current.right;
                        parent[direction] = c;
                        return;
                    }
                    var parent_of_c = null;
                    while (c.right != null) {
                        parent_of_c = c;
                        c = c.right;
                    }
                    parent_of_c.right = null;
                    c.left = current.left;
                    c.right = current.right;
                    if (current != this.root) {
                        parent[direction] = c;
                    }
                    else {
                        this.root = c;
                    }
                    return;
                }
            }
            else if (val < current.val) {
                parent = current;
                direction = "left";
                current = current.left;
            }
            else {
                parent = current;
                direction = "right";
                current = current.right;
            }
        }
        return;
    };
    /**
     * search
     */
    RBTree.prototype.search = function (val) {
        var current = this.root;
        while (current != null) {
            if (current.val == val) {
                return true;
            }
            else if (val < current.val) {
                current = current.left;
            }
            else {
                current = current.right;
            }
        }
        return false;
    };
    return RBTree;
}());
exports.RBTree = RBTree;
