var fileData = require("../data/fileData");

var game = function(){

    this.player_num = 0;
    this.board_num = 0;
    this.sequence_count = 0;
    this.Alphabet ="OXABCDEFGHIJLLMNPQRSTUVWYZ"
    this.is_quit = 0;
    this.gameStatus = null;
    this.winner = null;
    this.board = new Array();
    this.players = new Array();
    this.currentplayer = 0;
    this.total_step;
    this.file_path = 'save/';

    this.GameInitial = function(player_num,board_num,sequence_count){
       this.player_num = player_num;
       this.board_num = board_num;
       this.sequence_count = sequence_count;
       for(var i=0;i<player_num;i++){
            this.players[i] = this.Alphabet.charAt(i);
       }
       for(var i=0;i<board_num;i++){
            this.board[i] = new Array();
            for(var j=0;j<board_num;j++){
                this.board[i][j] = null;
            }
       }
       this.total_step = board_num * board_num;
       
    };

    this.quit = function(){
        this.quit = 1;
        console.log("Bye");
    }

    this.checkTie = function(){
        if(this.total_step<=0){
            return true;
        }else{
            return false;
        }
    }

    this.checkWin = function(GM,x,y){
        var player = GM.players[this.currentplayer];
        var step = this.sequence_count;
        var maxContinuousRowStep = 1;
        var maxContinuousColumnStep = 1;
        var maxContinuousDiaStep = 1;
        
        //horizontal
        var checkRow = function(){
            var i = y-1;
            
            while(i>=0 && GM.board[x][i]==player){
                maxContinuousRowStep++;
                i--;
            }
            var j = y+1;
            while(j<GM.board_num && GM.board[x][j]==player){
                maxContinuousRowStep++;
                j++;
            }
            if(maxContinuousRowStep>=step){
                return true;
            }else{
                return false;
            }
        }

        //vertical
        var checkColumn = function(){
            var i = x-1;
            
            while(i>=0 && GM.board[i][y]==player){
                maxContinuousColumnStep++;
                i--;
            }
            var j = x+1;
            while(j<GM.board_num && GM.board[j][y]==player){
                maxContinuousColumnStep++;
                j++;
            }
            if(maxContinuousColumnStep>=step){
                return true;
            }else{
                return false;
            }
        }

        //diagonal
        var checkDiagonal = function(){
            var i = x-1;
            var j = y-1;
            while(i>=0 && j>=0 && GM.board[i][j]==player){
                maxContinuousDiaStep++;
                i--;
                j--;
            }
            var m = x+1;
            var n = y+1;
            while(m<GM.board_num && n<<GM.board_num && GM.board[m][n]==player){
                maxContinuousDiaStep++;
                m++;
                n++;
            }
            if(maxContinuousDiaStep>=step){
                return true;
            }else{
                return false;
            }
        }

        return checkRow()||checkColumn()||checkDiagonal();
    }
    
    this.saveGame = function(filename,GM){
        var saveObj = {
            player_num: GM.player_num,
            board_num: GM.board_num,
            sequence_count: GM.sequence_count,
            board : GM.board,
            players : GM.players,
            currentplayer : GM.currentplayer,
            total_step :GM.total_step
        }

        var saveText = JSON.stringify(saveObj);
        var path = this.file_path + filename;
		var fileWtPromise = fileData.saveStringToFile(path,saveText);
		fileWtPromise.then((rtn)=>{
            console.log("save success");
        },(err)=>{
            console.log(err);
        });
    }

    this.resumeGame = function(filename,GM){
        var fileRdPromise = fileData.getFileAsJSON(filename);
        return new Promise(function(fulfill, reject){
           fileRdPromise.then((rtn)=>{
                GM.player_num = rtn.player_num;
                GM.board_num = rtn.board_num;
                GM.sequence_count = rtn.sequence_count;
                GM.board = rtn.board;
                GM.players = rtn.players;
                GM.currentplayer = rtn.currentplayer;
                GM.total_step = rtn.total_step ;
                fulfill(GM);
            },(err)=>{
                console.log(err);
            });
        });
        
    }

}



module.exports = {
    game : game
};