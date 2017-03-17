"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stack_1 = require("./stack");
var queue_1 = require("./queue");
var prompt = require('prompt-sync')();
outter: while (true) {
    var express = prompt('please enter a infix math express: ');
    express = express.replace(/\s+/g, '');
    express = express.replace(/\^/g, '');
    //change POW to operator
    express = express.replace(/POW/g, '^');
    if (express === 'quit') {
        break;
    }
    var checkBraceStack = new stack_1.Stack();
    //check if the express is invalid
    for (var i_1 = 0; i_1 < express.length; i_1++) {
        //check negative operand
        if ((i_1 == 0 && express[i_1] == '-') || (i_1 > 0 && express[i_1] == '-' && express[i_1 - 1] == '(')) {
            console.log("negative number is not allow");
            continue outter;
        }
        if (express[i_1] != '0' && express[i_1] != '1' && express[i_1] != '2' && express[i_1] != '3' && express[i_1] != '4' && express[i_1] != '5' && express[i_1] != '6' && express[i_1] != '7' && express[i_1] != '8' && express[i_1] != '9' && express[i_1] != '+' && express[i_1] != '-' && express[i_1] != '*' && express[i_1] != '/' && express[i_1] != '%' && express[i_1] != '(' && express[i_1] != ')' && express[i_1] != '^') {
            console.log("math express is invalid");
            continue outter;
        }
        if (express[i_1] == '(') {
            if (i_1 != 0 && i_1 != express.length - 1) {
                if (isOperator(express[i_1 + 1])) {
                    console.log("math express is invalid");
                    continue outter;
                }
                if (!isOperator(express[i_1 - 1])) {
                    console.log("math express is invalid");
                    continue outter;
                }
            }
            checkBraceStack.push(express[i_1]);
        }
        if (express[i_1] == ')') {
            if (i_1 != 0 && i_1 != express.length - 1) {
                if (isOperator(express[i_1 - 1])) {
                    console.log("math express is invalid");
                    continue outter;
                }
                if (!isOperator(express[i_1 + 1])) {
                    console.log("math express is invalid");
                    continue outter;
                }
            }
            if (checkBraceStack.length == 0) {
                console.log("parenthesis invalid");
                continue outter;
            }
            else {
                checkBraceStack.pop();
            }
        }
        if (isOperator(express[i_1]) && i_1 < express.length - 1) {
            if (isOperator(express[i_1 + 1])) {
                console.log("math express is invalid");
                continue outter;
            }
        }
    }
    if (checkBraceStack.length != 0) {
        console.log("parenthesis invalid");
        continue outter;
    }
    var opStack = new stack_1.Stack();
    var postQ = new queue_1.Queue();
    var i = 0;
    var temp = '';
    //transfer infix to postfix
    while (i < express.length) {
        if (parseInt(express[i]) >= 0 && parseInt(express[i]) < 10) {
            temp += '' + express[i];
            if (i == express.length - 1) {
                postQ.enqueue(temp);
            }
            else {
                // if(parseInt(express[i+1])>=0&&parseInt(express[i+1])<10){
                // }else{
                //     postQ.enqueue(temp);
                //     temp = '';
                // }
                if (isOperator(express[i + 1])) {
                    postQ.enqueue(temp);
                    temp = '';
                }
            }
        }
        else if (opStack.length == 0) {
            opStack.push(express[i]);
        }
        else if (express[i] == '(') {
            opStack.push(express[i]);
        }
        else if (express[i] == ')') {
            while (opStack.peek() != '(') {
                postQ.enqueue(opStack.peek());
                opStack.pop();
            }
            opStack.pop();
        }
        else {
            while (opStack.length != 0 && opStack.peek() != '(' && precedence(express[i]) <= precedence(opStack.peek())) {
                postQ.enqueue(opStack.peek());
                opStack.pop();
            }
            opStack.push(express[i]);
        }
        // console.log(i);
        // console.log(postQ);
        // console.log(opStack);
        i++;
    }
    while (opStack.length != 0) {
        postQ.enqueue(opStack.peek());
        opStack.pop();
    }
    var evalStack = new stack_1.Stack();
    var postfixQ = new queue_1.Queue();
    var output = '';
    while (postQ.length != 0) {
        var str = '';
        if (postQ.peek() == '^') {
            str = 'POW';
        }
        else {
            str = postQ.peek();
        }
        output += str + " ";
        postfixQ.enqueue(postQ.dequeue());
    }
    console.log("postfix express: " + output);
    //evaluate
    while (postfixQ.length != 0) {
        var t = postfixQ.dequeue();
        if (isOperator(t)) {
            var topNum = evalStack.pop();
            var nextNum = evalStack.pop();
            var answer;
            switch (t) {
                case '+':
                    answer = parseInt(nextNum) + parseInt(topNum);
                    break;
                case '-':
                    answer = parseInt(nextNum) - parseInt(topNum);
                    break;
                case '*':
                    answer = parseInt(nextNum) * parseInt(topNum);
                    break;
                case '/':
                    answer = parseInt(nextNum) / parseInt(topNum);
                    break;
                case '%':
                    answer = parseInt(nextNum) % parseInt(topNum);
                    break;
                case '^':
                    answer = Math.pow(parseInt(nextNum), parseInt(topNum));
                    break;
                default:
                    break;
            }
            evalStack.push(answer.toString());
        }
        else {
            evalStack.push(t);
        }
    }
    console.log("result: " + evalStack.peek());
}
function precedence(operator) {
    if (operator == '+' || operator == '-') {
        return 1;
    }
    if (operator == '*' || operator == '/') {
        return 2;
    }
    if (operator == '^') {
        return 3;
    }
}
function isOperator(s) {
    switch (s) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '%':
        case '^':
            return true;
        default:
            return false;
    }
}
