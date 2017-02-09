var gameModel = require('../model/game');
var prompt = require('prompt-sync')();
//var prompt = require('prompt');

let exportedMethods = {
    newGame(){
        // prompt.start();

        // prompt.get([{
        //     name: 'player_num',
        //     description: 'How many players are playing(1~26)',
        //     type: 'integer',
        //     required: true
        // },{
        //     name: 'board_num',
        //     description: 'How large the board should be as a prompt on its own line(1~999)',
        //     type: 'integer',
        //     required: true
        // },{
        //     name: 'sequence_count',
        //     description: 'what the win sequence count should be',
        //     type: 'integer',
        //     required: true
        // }], function (err, result) {

        //     if(result.player_num > result.board_num + 1){       
        //         reject("player number at least bigger than board number + 1, otherwise no one can win the game");
        //     }

        //     if(result.sequence_count > result.board_num){        
        //         reject("win sequence count must bigger than board number, otherwise no one can win the game");
        //     }
            
        // });
        try {
            var player_num = prompt('How many players are playing(1~26): ');
            if(player_num>=1 && player_num<=26){
                    var board_num = prompt('How large the board should be(1~999): ');
                    if(board_num>0 && board_num<=999){
                        var sequence_count = prompt('what the win sequence count should be ');
                        if(sequence_count>0 && sequence_count<= board_num){
                            if((board_num*board_num)/sequence_count >= player_num - 1){
                                var GM = new gameModel.game();
                                GM.GameInitial(player_num,board_num,sequence_count);
                                this.renderGame(GM);
                                return GM;
                            }else{
                                throw "nobody can win, result.board_num/result.sequence_count >= result.player - 1";
                            }
                        }else{
                            throw "sequence count should be 1~board number";
                        }
                    }else{
                        throw "board number must be 1~999";
                    }
            }else{
                throw "players number must be 1~26";
            }
        } catch (error) {
            throw error;
        }
       
       
       
       //console.log(GM);
    },
    resumeGame(filename){
        var GM = new gameModel.game();
        GM.resumeGame('./save/'+filename,GM).then((GM)=>{
            this.renderGame(GM);
            this.processGame(GM);
        }).catch((err)=>{
            console.log(err);
        });
    },

    processGame(GM){
        while(GM.is_quit==0||GM.gameStatus!=null){
            var result = prompt(GM.players[GM.currentplayer] +': Please enter a row and column number separated by spaces, or Q to quit: ');
            if(result==='Q'){
                GM.is_quit = 1;
            }else{
                var row_column = result.split(" ");
                if(row_column[0]<=GM.board_num && row_column[0]>=1 && row_column[1]>=1 &&row_column[1]<=GM.board_num){
                    if(GM.board[row_column[0]-1][row_column[1]-1] != null){
                        console.log("this spot has been occupied, please choose another spot");
                    }else{
                        GM.board[row_column[0]-1][row_column[1]-1] =  GM.players[GM.currentplayer];
                        GM.total_step --;
                        this.renderGame(GM);
                        if(GM.checkWin(GM,row_column[0]-1,row_column[1]-1)==true){
                            GM.gameStatus = "win";
                            GM.winner = GM.players[GM.currentplayer];
                            break;
                        }else if(GM.checkTie()){
                            GM.gameStatus = "tie";
                            break;
                        }
                        GM.currentplayer = (GM.currentplayer+1) % GM.player_num;
                    }
                }else{
                    console.log("number not correct");
                }
            }
        }

        if(GM.gameStatus == "win"){
            console.log("congration, winner is "+ GM.winner);
        }else if(GM.gameStatus == "tie"){
            console.log("Pitty, it's a tie game.");
        }
        
        if(GM.is_quit == 1){
            var result = prompt('Do you want to save game (y/n): ');
            if(result=='y'){
                var filename = prompt('Please enter your filename: ');
                GM.saveGame(filename,GM);
            }else{
                GM.quit();
            }
        }
    },


    renderGame(gameModel){
        var output = '';
        //render top column number
        for(var i=0;i<gameModel.board_num;i++){
            if(i==0){
                output += '   ';
            }
            var temp = 1+i;
            if(temp<10){
               temp  = "00"+(1+i);
            }else if(temp>=10 && temp<=99){
                var temp = "0"+ (1+i);
            }
            output += ' ' + temp ;
        }
        output += "\n";
        for(var i=0;i<gameModel.board.length;i++){
            var temp = 1+i;
            if(temp<10){
               temp  = "00"+(1+i);
            }else if(temp>=10 && temp<=99){
                var temp = "0"+ (1+i);
            }
            output = output + temp + " ";
            for(var j=0;j<gameModel.board[i].length;j++){
                
                if(gameModel.board[i][j] == null){
                    output += '   ';
                }else{
                    output += ' '+gameModel.board[i][j]+' ';
                }
                
                if(j!=gameModel.board[i].length-1){
                    output += '|';
                }
            }
            if(i!=gameModel.board.length-1){
                output += "\n";
                for(var j=0;j<gameModel.board[i].length;j++){
                    if(j==0){
                        output += '    ---';
                    }else{
                        output += '---';
                    }
                    
                    if(j!=gameModel.board[i].length-1){
                        output += '+';
                    }
                }
                output += "\n";
            }
        }
        console.log(output); 
    },
};


module.exports = exportedMethods;