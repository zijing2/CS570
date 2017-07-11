var fizzBuzz = function(m,n) {
    if(typeof m!=='number'){
        throw "m has to be a number";
    }
    if(typeof n!=='number'){
        throw "n has to be a number";
    }
    for(var i=m;i<=n;i++){
        var output = '';
        if(i%5===0){
            output = output + 'Buzz';
            console.log(output); 
        }
        if(i%3===0){
            output = output + 'Fizz';
            console.log(output); 
        }
        if(output===''){
            console.log(i.toString());
        }
    }
    return true;
};

try {
    console.log(fizzBuzz(74,291));
} catch (error) {
    console.log(error);
}

