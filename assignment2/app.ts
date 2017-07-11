import { Stack } from './stack';
import { Queue } from './queue';
import prompt_f = require('prompt-sync');
var prompt = prompt_f();


function main(){
    
    outter: while(true){
        var express = prompt('please enter a infix math express: ');
        express = express.replace(/\s+/g, '');
        express = express.replace(/\^/g, '');
        //change POW to operator
        express = express.replace(/POW/g,'^');
        if(express==='quit'){
            break;
        }       
        //check if the express is invalid
        try {
            checkExpress(express);
        } catch (error) {
            console.log(error);
            continue outter;
        }
            
        var opStack = new Stack<string>();
        var postQ = new Queue<string>();

        conversion(opStack, postQ, express);

        var evalStack = new Stack<string>();
        var postfixQ = new Queue<string>();

        //output conversion
        var output = '';
        while(postQ.length!=0){
            var str='';
            if(postQ.peek()=='^'){
            str = 'POW'; 
            }else{
                str = postQ.peek();
            }
            output += str + " ";
            postfixQ.enqueue(postQ.dequeue());
        }   
        console.log("postfix express: " + output);

        
        calculate(postfixQ,evalStack);
        //output evaluate
        console.log("result: " + evalStack.peek());
        
    }
}

main(); 

function checkExpress(express){
    var checkBraceStack = new Stack<string>();
    for(let i=0;i<express.length;i++){
            //check negative operand
            if((i==0&&express[i]=='-')||(i>0&&express[i]=='-'&&express[i-1]=='(')){
                throw "negative number is not allow";
            }
            if(express[i]!='0'&&express[i]!='1'&&express[i]!='2'&&express[i]!='3'&&express[i]!='4'&&express[i]!='5'&&express[i]!='6'&&express[i]!='7'&&express[i]!='8'&&express[i]!='9'&&express[i]!='+'&&express[i]!='-'&&express[i]!='*'&&express[i]!='/'&&express[i]!='%'&&express[i]!='('&&express[i]!=')'&&express[i]!='^'){
                throw "math express is invalid";
            }
            if(express[i]=='('){
                if(i!=0&&i!=express.length-1){
                    if(isOperator(express[i+1])&&express[i+1]!='('){
                        throw "math express is invalid";
                    }
                    if(!isOperator(express[i-1])&&express[i-1]!='('&&express[i-1]!=')'){
                        throw "math express is invalid";
                    }
                }
                checkBraceStack.push(express[i]);
            }
            if(express[i]==')'){
                if(i!=0&&i!=express.length-1){
                    if(isOperator(express[i-1])&&express[i-1]!=')'){
                        throw "math express is invalid";
                    }
                    if(!isOperator(express[i+1])&&express[i+1]!='('&&express[i+1]!=')'){
                        throw "math express is invalid";
                    }
                }
                if(checkBraceStack.length==0){
                    throw "parenthesis invalid";
                }else{
                    checkBraceStack.pop();
                }
            }
            if(isOperator(express[i])&&i<express.length-1){
                if(isOperator(express[i+1])){
                    throw "math express is invalid";
                }
            }
        }
        if(checkBraceStack.length!=0){
            throw "parenthesis invalid";
        }
}


function conversion(opStack, postQ, express){
    var i=0;
        var temp='';

        //transfer infix to postfix
        while(i<express.length){
            if(parseInt(express[i])>=0&&parseInt(express[i])<10){
                temp += '' + express[i];
                if(i==express.length-1){
                    postQ.enqueue(temp);
                }else{
                    if(parseInt(express[i+1])>=0&&parseInt(express[i+1])<10){

                    }else{
                        postQ.enqueue(temp);
                        temp = '';
                    }
                }
            }else if(opStack.length==0){
                opStack.push(express[i]);
            }else if(express[i]=='('){
                opStack.push(express[i]);
            }else if(express[i]==')'){
                while(opStack.peek()!='('){
                    postQ.enqueue(opStack.peek());
                    opStack.pop();
                }
                opStack.pop();
            }else{
                while(opStack.length!=0 && opStack.peek()!='(' && precedence(express[i])<=precedence(opStack.peek())){
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

         while (opStack.length!=0) { 
            postQ.enqueue(opStack.peek());
            opStack.pop();
        }
}

function calculate(postfixQ,evalStack){
        while(postfixQ.length!=0){
            var t = postfixQ.dequeue();
            if(isOperator(t)){
                var topNum = evalStack.pop();
                var nextNum = evalStack.pop();
                var answer;
                switch (t) {
                    case '+': answer = parseInt(nextNum) + parseInt(topNum); break;
                    case '-': answer = parseInt(nextNum) - parseInt(topNum); break;
                    case '*': answer = parseInt(nextNum) * parseInt(topNum); break;
                    case '/': answer = parseInt(nextNum) / parseInt(topNum); break;
                    case '%': answer = parseInt(nextNum) % parseInt(topNum); break;
                    case '^': answer = Math.pow(parseInt(nextNum),parseInt(topNum)); break;
                    default:
                        break;
                }
                evalStack.push(answer.toString());
            }else{
                evalStack.push(t);
            }
        }
}


function precedence(operator){
    if(operator=='+'||operator=='-'){
        return 1;
    }
    if(operator=='*'||operator=='/'){
        return 2;
    }
    if(operator=='^'){
        return 3;
    }
}

function isOperator(s){
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

