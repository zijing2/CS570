"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TreeNode = (function () {
    function TreeNode(val, color, parent) {
        this.val = val;
        this.left = null;
        this.right = null;
        this.color = color;
        this.parent = parent;
    }
    return TreeNode;
}());
var RBTree = (function () {
    function RBTree() {
    }
    /**
     * insertion
     */
    RBTree.prototype.insert = function (val) {
        var current = this.root;
        while (current != null) {
            if (current.val == val) {
                return;
            }
            else if (val < current.val) {
                if (current.left == null) {
                    current.left = new TreeNode(val, "red", current);
                    if (current.color == 'red') {
                        this.ajust(current.left);
                    }
                    return;
                }
                else {
                    current.left.parent = current;
                    current = current.left;
                }
            }
            else {
                if (current.right == null) {
                    current.right = new TreeNode(val, "red", current);
                    if (current.color == 'red') {
                        this.ajust(current.right);
                    }
                    return;
                }
                else {
                    current.right.parent = current;
                    current = current.right;
                }
            }
        }
        //rbt insertion case1: insert node is root
        this.root = new TreeNode(val, "black", null);
        return;
    };
    /**
     * deletion
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
                            if (current.color === "black" && current.left !== null) {
                                if (current.left.color === "red") {
                                    current.left.color = "black";
                                }
                                else {
                                    this.fixDeleteOneChild(current.left);
                                }
                            }
                            return;
                        }
                        else {
                            this.root = current.right;
                            if (current.color === "black" && current.right !== null) {
                                if (current.right.color === "red") {
                                    current.right.color = "black";
                                }
                                else {
                                    this.fixDeleteOneChild(current.right);
                                }
                            }
                            return;
                        }
                    }
                    else {
                        if (current.left != null) {
                            current.left.parent = parent;
                            parent[direction] = current.left;
                            if (current.color === "black" && current.left !== null) {
                                if (current.left.color === "red") {
                                    current.left.color = "black";
                                }
                                else {
                                    this.fixDeleteOneChild(current.left);
                                }
                            }
                            return;
                        }
                        else {
                            current.right.parent = parent;
                            parent[direction] = current.right;
                            if (current.color === "black" && current.right !== null) {
                                if (current.right.color === "red") {
                                    current.right.color = "black";
                                }
                                else {
                                    this.fixDeleteOneChild(current.right);
                                }
                            }
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
                        current.right.parent = c;
                        parent[direction] = c;
                        c.parent = parent;
                        c.color = current.color;
                        return;
                    }
                    var parent_of_c = null;
                    while (c.right != null) {
                        parent_of_c = c;
                        c = c.right;
                    }
                    parent_of_c.right = c.left;
                    if (c.left != null) {
                        c.left.parent = parent_of_c;
                    }
                    c.left = current.left;
                    current.left.parent = c;
                    c.right = current.right;
                    current.right.parent = c;
                    if (current != this.root) {
                        parent[direction] = c;
                        c.parent = parent;
                    }
                    else {
                        this.root = c;
                        c.parent = null;
                    }
                    c.color = current.color;
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
    RBTree.prototype.ajust = function (n) {
        //case1
        if (n == this.root) {
            n.color = "black";
        }
        else {
            //case2
            if (n.parent.color == "black") {
                return;
            }
            else {
                //case3
                if (this.uncle(n) != null && this.uncle(n).color == 'red') {
                    n.parent.color = 'black';
                    this.uncle(n).color = 'black';
                    this.grandparent(n).color = 'red';
                    this.ajust(this.grandparent(n));
                }
                else {
                    //case4
                    if ((n == n.parent.right) && n.parent == this.grandparent(n).left) {
                        this.rotateLeft(n.parent);
                        n = n.left;
                    }
                    else if ((n == n.parent.left) && (n.parent == this.grandparent(n).right)) {
                        this.rotateRight(n.parent);
                        n = n.right;
                    }
                    else {
                        //case5
                        n.parent.color = 'black';
                        this.grandparent(n).color = 'red';
                        if ((n == n.parent.left) && (n.parent == this.grandparent(n).left)) {
                            this.rotateRight(this.grandparent(n));
                        }
                        else {
                            this.rotateLeft(this.grandparent(n));
                        }
                    }
                }
            }
        }
    };
    RBTree.prototype.grandparent = function (n) {
        return n.parent.parent;
    };
    RBTree.prototype.uncle = function (n) {
        if (n.parent == this.grandparent(n).right) {
            return this.grandparent(n).left;
        }
        else {
            return this.grandparent(n).right;
        }
    };
    // private rotateLeft(n : TreeNode) {
    //     var newNode = n.right;
    //     var parent = n.parent;
    //     parent.left = newNode;
    //     n.parent = newNode;
    //     n.right = newNode.left;
    //     if(newNode.left != null)
    //         newNode.left.parent=n;
    //     newNode.parent=parent;
    //     newNode.left=n;
    // }
    // private rotateRight(n : TreeNode) {
    //     var newNode = n.left;
    //     var parent = n.parent;
    //     parent.right = newNode;
    //     n.parent = newNode;
    //     n.left = newNode.right;
    //     if(newNode.right != null)
    //         newNode.right.parent=n;
    //     newNode.parent=parent;
    //     newNode.right=n;
    // }
    RBTree.prototype.rotateLeft = function (node) {
        var temp = node.right;
        this.replaceNode(node, temp);
        node.right = temp.left;
        if (node.right !== null) {
            node.right.parent = node;
        }
        temp.left = node;
        node.parent = temp;
    };
    RBTree.prototype.rotateRight = function (node) {
        var temp = node.left;
        this.replaceNode(node, temp);
        node.left = temp.right;
        if (node.left !== null) {
            node.left.parent = node;
        }
        temp.right = node;
        node.parent = temp;
    };
    RBTree.prototype.replaceNode = function (oldNode, newNode) {
        var parent = oldNode.parent;
        if (newNode !== null) {
            newNode.parent = parent;
        }
        if (parent === null) {
            this.root = newNode;
        }
        else {
            if (oldNode === parent.left) {
                parent.left = newNode;
            }
            else {
                parent.right = newNode;
            }
        }
    };
    RBTree.prototype.fixDeleteOneChild = function (node) {
        if (node.parent === null) {
            return;
        }
        var parent = node.parent;
        var sibling = (node === parent.left) ?
            parent.right : parent.left;
        if (sibling.color === "red") {
            parent.color = "red";
            sibling.color = "black";
            if (node === parent.left) {
                this.rotateLeft(parent);
                sibling = parent.right;
            }
            else {
                this.rotateRight(parent);
                sibling = parent.left;
            }
        }
        var slb = sibling.left === null || sibling.left.color === "black";
        var srb = sibling.right === null || sibling.right.color === "black";
        if (sibling.color === "black" && slb && srb) {
            sibling.color = "red";
            if (parent.color === "red") {
                parent.color = "black";
            }
            else {
                this.fixDeleteOneChild(parent);
            }
            return;
        }
        if (node === parent.left) {
            if (srb) {
                sibling.color = "red";
                sibling.left.color = "black";
                this.rotateRight(sibling);
                sibling = sibling.parent;
            }
        }
        else {
            if (slb) {
                sibling.color = "red";
                sibling.right.color = "black";
                this.rotateLeft(sibling);
                sibling = sibling.parent;
            }
        }
        sibling.color = parent.color;
        parent.color = "black";
        if (node === parent.left) {
            if (sibling.right !== null) {
                sibling.right.color = "black";
            }
            this.rotateLeft(parent);
        }
        else {
            if (sibling.left !== null) {
                sibling.left.color = "black";
            }
            this.rotateRight(parent);
        }
    };
    return RBTree;
}());
exports.RBTree = RBTree;
