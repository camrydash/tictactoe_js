/*var game = {
	player : "O",
	spaceArray : [],
	turn : 0
};
*/


var game = function() {
	this.initialize = function () {
		this.player = "O";
		this.turn = 0;
		this.spaceArray = [];
		this.isComplete = false;
	};
	this.initialize();
}

var g = new game();

game.prototype.resetGame = function() {
	this.initialize();
	resetView();
};

game.prototype.currentPlayer = function () {
	return this.player;
};

game.prototype.gameComplete = function () {
	return this.isComplete;
};

game.prototype.winCondition = function () {
	var winningConditions = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]];
	return winningConditions.some(function(element, index, array) {
		var player = this.spaceArray[element[0] - 1];
		if (player == undefined)
			return false;
		if((this.spaceArray[element[0] - 1] == this.spaceArray[element[1] - 1]) && (this.spaceArray[element[1] - 1] == this.spaceArray[element[2] - 1])) {
			this.isComplete = true;
			showCompete(element);
			//some body won
			//debugger;
			//console.log("you win!!!");
			//alert(player + " has won at " + element);
			return true;
		}
	}.bind(this));
};

game.prototype.insertPosition = function(pos) {
	if (this.spaceArray[pos])
		throw "this position is already filled";
	this.spaceArray[pos] = (this.currentPlayer());
	if(!this.winCondition()) {
		this.turn++;
		if(this.turn % 2 == 0) {
			this.player = "O";
		} else {
			this.player = "X";
		}
		return false;
	}
	return true;
};

var showCompete = function(arr) {
	if(arr && arr.length) {
		console.log("winning player: " + g.currentPlayer());
		updateStatus("winning player: " + g.currentPlayer());
		arr.forEach(function(e, i, a) {
			$("table td:eq(" + --e + ")").addClass("red");
		});
	}
};

var resetView = function() {
	$("table td").each(function() {
		$(this).removeClass("red").empty();
	});
};

var updateStatus = function(msg) {
	$("#status").html(msg);
};

$("#reset").click(function() {
	g.resetGame();
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