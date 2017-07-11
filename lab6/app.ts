import {Dictionary} from "./Dictionary"
var d = new Dictionary();
d.insert("hello","world");
d.insert("goodbye","everyone");
d.insert("name","student");
d.insert("occupation","student");
d.insert("year","2016");
d.insert("gpa","4.0");
d.insert("lab","yes");
d.insert("assignment","no");
d.insert("department","cs");


// console.log(d.hasKey("abc"));
// console.log(d.hasKey("gpa"));
console.log(d.retrieve("gpa"));
console.log(d.retrieve("department"));


//This is the RBTree I wrote myself
// import {RBTree} from "./RBTree";

// var rbt = new RBTree();
// // rbt.insert(5);
// // rbt.insert(3);
// // rbt.insert(2);
// // rbt.insert(1);
// // rbt.insert(4);
// // rbt.insert(8);
// // rbt.insert(6);
// // rbt.insert(7);
// // rbt.insert(10);

// // rbt.delete(8);
// // //rbt.delete(13);
// // console.log(rbt.search(5));
// // console.log(rbt.search(3));
// // console.log(rbt.search(2));
// // console.log(rbt.search(1));
// // console.log(rbt.search(4));
// // console.log(rbt.search(8));
// // console.log(rbt.search(6));
// // console.log(rbt.search(7));
// // console.log(rbt.search(10))

// rbt.insert(1);
// rbt.insert(2);
// rbt.insert(3);
// rbt.insert(4);
// rbt.insert(5);
// rbt.insert(6);
// rbt.delete(5);

// console.log(rbt.root);

// //console.log();