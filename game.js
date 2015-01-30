var MAX_TURNS = 9;
var PLAYERS = ["X", "O"];
var INITIAL_PLAYER = PLAYERS[0];
var WIN_INDEXES = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]];

var g;
function initialize() {
	g = new Game();
	WIN_INDEXES = WIN_INDEXES.map(function(subArray) {
		return subArray.map(function(position) {
				return position - 1;
		});
	});
	//console.log(WIN_INDEXES)
}

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
		this.player = (this.player === PLAYERS[0]) ? PLAYERS[1] : PLAYERS[0];
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
		if(this.turn == MAX_TURNS) {
			updateMessage("Game is a draw!");
			return true;
		} else {
			return WIN_INDEXES.some(function(element, index, array) {
				//[] the below condition can be true if all indexes in 'spaceArray' are 'undefined'
				var previousPlayer;
				var gameWinner = function(index) {
					if(this[index] != undefined) {
						if(previousPlayer == undefined)
							previousPlayer = this[index];
						else
							return this[index] == previousPlayer;
						return true;
					}
				}
				if(element.every(gameWinner.bind($(this.spaceArray)))) {
					this.isComplete = true;
					showCompete(element);
					return true;
				}
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

function showCompete(arr) {
	if(arr && arr.length) {
		var winMsg = "Winner: Player " + g.currentPlayer();
		console.log(winMsg);
		updateMessage(winMsg);
		arr.forEach(function(e, i, a) {
			$("table td:eq(" + e + ")").addClass("red");
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


function resetGame() {
	g.resetGame();
	resetView();
}

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

initialize();

/*
g.insertPosition(1);
g.insertPosition(2);
g.insertPosition(4);
g.insertPosition(6);
g.insertPosition(7);
*/
