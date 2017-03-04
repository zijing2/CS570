var array = [];

for(var i=0;i<20;i++){
    array[i] = Math.floor((Math.random() * 10) + 1);
}

console.log(array);
console.log(BouncyBubbleSort(array));

function BouncyBubbleSort(array){
    var temp;
    var swap = 0;
    var left = 0;
    var right = 0;

    for(var i=0;i<array.length-1;i++){
        //odd loop
        if(i%2==0){
            for(var j=left;j<array.length-1-right;j++){
                if(array[j]>array[j+1]){
                    temp = array[j];
                    array[j] = array[j+1];
                    array[j+1] = temp;
                    swap++;
                }
            }
            right++;
        }else{
            for(var j=array.length-1-right;j>left;j--){
                if(array[j]<array[j-1]){
                    temp = array[j];
                    array[j] = array[j-1];
                    array[j-1] = temp;
                    swap++;
                }
            }
            left++;
        }

        if(swap==0){
            break;
        }else{
            swap = 0;
        }
    }

    return array; 
}
