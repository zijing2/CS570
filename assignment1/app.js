var prompt = require('prompt');
var game = require('./controller/game');
var fileData = require("./data/fileData");

prompt.start();

prompt.get([{
    name: 'newGame',
    description: 'Would you like to resume a save game:(y/n)',
    type: 'string',
    pattern: /(y)|(n)/,
    required: true
  }], function (err, result) {
      if(result.newGame == 'n'){
          try {
              var GM = game.newGame();
              game.processGame(GM);
          } catch (error) {
              console.log(error);
          }    
      }else{
            var filesList = [];
            fileData.readFileList('save/', filesList);
            console.log(filesList);
            prompt.get([{
                name: 'filename',
                description: 'Choose your save data to continue the battle!',
                type: 'string',
                required: true
            }],function (err, result) {
                var in_array = 0;
                for(var i=0;i<filesList.length;i++){
                    if(filesList[i] == result.filename){
                        in_array = 1;
                    }
                }
                if(in_array==1){
                    game.resumeGame(result.filename);
                }else{
                    console.log("filename not match, please try again");
                }
            });
            
      }
});








