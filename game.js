/*var game = {
	player : "O",
	spaceArray : [],
	turn : 0
};
*/

var MAX_TURNS = 9;
var PLAYERS = ["X", "O"];
var INITIAL_PLAYER = PLAYERS[0];

function Game() {

}

Game.prototype = {
	player : INITIAL_PLAYER,
	turn : 0,
	spaceArray : [],
	isComplete : false, //Game is complete when someone wins or if all spaces are filled
	currentPlayer : function() {
		return this.player;
	},
	gameComplete : function () {
		return this.isComplete;
	},
	switchPlayer : function() {
		if(this.player === PLAYERS[0])
			this.player = PLAYERS[1];
		else
			this.player = PLAYERS[0];
	},
	insertPosition : function(pos) {
		//debugger;
		if (this.spaceArray[pos])
			throw "this position is already filled";
		this.spaceArray[pos] = this.currentPlayer();
		this.turn++;
		if(!this.completeCondition()) {
			this.switchPlayer();
			return false;
		}
		return true;
	},
	completeCondition : function() {
		var winningConditions = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]];
		if(this.turn == MAX_TURNS) {
			updateMessage("Game is a draw!");
			return true;
		} else {
			return winningConditions.some(function(item, index, array) {
				if(this.spaceArray[item[0] - 1] == undefined)
					return false;		
				//[] the below condition can be true if all indexes in 'spaceArray' are 'undefined'		
				if((this.spaceArray[item[0] - 1] === this.spaceArray[item[1] - 1]) && (this.spaceArray[item[1] - 1] === this.spaceArray[item[2] - 1])) {
					this.isComplete = true;
					showCompete(item);
					return true;
				}
				return false;
			}.bind(this));
		}		
	},
	resetGame : function() {
		this.player = INITIAL_PLAYER;
		this.turn = 0;
		this.spaceArray = [];
		this.isComplete = false;
	}
};

var g = new Game();

function showCompete(arr) {
	if(arr && arr.length) {
		var winMsg = "Winner: Player " + g.currentPlayer();
		console.log(winMsg);
		updateMessage(winMsg);
		arr.forEach(function(e, i, a) {
			$("table td:eq(" + --e + ")").addClass("red");
		});
	}
};

function resetView() {
	$("#status").empty();
	$("table td").each(function() {
		$(this).removeClass("red").empty();
	});
};

function updateMessage(msg) {
	$("#status").html(msg);
};

$("#reset").click(function() {
	g.resetGame();
	resetView();
});

$("table td").click(function() {
	var pos = $("table td").index($(this));
	if(g.gameComplete())
		return;
	if(g.spaceArray[pos] == undefined) {
		console.log(pos);
		//debugger;
		$(this).html(g.currentPlayer());
		g.insertPosition(pos);
	}
});

/*
g.insertPosition(1);
g.insertPosition(2);
g.insertPosition(4);
g.insertPosition(6);
g.insertPosition(7);
*/