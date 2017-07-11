var prompt = require('prompt');
var fs = require('fs');

prompt.start();

// var s = "Htsnyhcdjwlevbah! Pfl zxo afsb dwusb srnsyz!";
// var decipher_string = decipher(s);
// console.log(decipher_string);

prompt.get(['filename'], function (err, result) {
    var path = result.filename;
    var fileRdPromise1 = getFileAsString(path);
	fileRdPromise1.then((input_string) => {
        var decipher_string = decipher(input_string);
        var path = "solution.txt";
        var fileWtPromise = saveStringToFile(path,decipher_string);
        fileWtPromise.then((rtn)=>{
            console.log("finished");
        },(err)=>{
            console.log(err);
        });
    }, (err) => {
		console.log(err);
	});
});

function decipher(s){
    var decipher_string = '';
    var key = 5;
    var s_array = s.split('');
    for(var i=0;i<s_array.length;i++){
        if(i%3==0&&i!=0){
            key = (key + 2)%26;
        }
        var s_num = s_array[i].charCodeAt(0);
        
        //if the char is from a-z or A-Z
        if((65<=s_num && s_num<=90) || (97<=s_num && s_num<=122)){
            if((65<=s_num && s_num<=90) && (s_num - key < 65)){
                s_num = 90-Math.abs((key-(s_num-64)));
            }else if((97<=s_num && s_num<=122) && (s_num - key < 97) ){
                s_num = 122-Math.abs(key-(s_num-96));
            }else{
                s_num = s_num - key;
            }
            decipher_string += String.fromCharCode(s_num);
        }else{
            //this loop is not from a-z or A-Z
            decipher_string += String.fromCharCode(s_num);
        }
    }
    
    return decipher_string;
}


 function getFileAsString(path) {
		return new Promise((fulfill, reject) => {

			if (path === undefined || typeof path !== "string") {
				reject("input path is invalid");
			} else {

				fs.readFile(path, "utf8", (err, data) => {
					if (err) {
						reject(err);
					};
					fulfill(data);
				});

			}
		});
	}

    function saveStringToFile(path, text) {
		return new Promise((fulfill, reject) => {
			if (text === undefined || typeof text !== "string") {
				reject("input text is invalid");
			}

			if (path === undefined || typeof path !== "string") {
				reject("input path is invalid");
			} else {
				fs.writeFile(path, text, function(err) {
					if (err) {
						reject(err);
					}
					fulfill(true);
				});
			}
		});
	}


