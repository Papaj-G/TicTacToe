var gameTiles = Array.from(document.querySelectorAll(".gameTile"));
var currentlyPlayingPlayer = document.querySelector(".currentPlayer");
var resetButton = document.querySelector("#btnReset");
var annoucements = document.querySelector(".announcement");
var gameEnded = false;
var players = ["X", "O"];

var board = [
	[gameTiles[0], gameTiles[1], gameTiles[2]],
	[gameTiles[3], gameTiles[4], gameTiles[5]],
	[gameTiles[6], gameTiles[7], gameTiles[8]],
];
//listeners for all buttons
board.forEach((array, row) => {
	array.forEach((tile, col) => {
		tile.addEventListener("click", () => {
			takeTurn(row, col);
			takeTurnAI();
		});
	});
});
resetButton.addEventListener("click", resetGame);
/////////////////////////////////

async function play() {}

function takeTurnAI() {
	if (gameEnded) {
		return;
	}
	do {
		var randomRow = getRandomInt(3);
		var randomCol = getRandomInt(3);
		console.log(randomRow, randomCol);
	} while (!isAnEmptySpot(randomRow, randomCol));
	takeTurn(randomRow, randomCol);
}
function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

async function takeTurn(row, col) {
	if (gameEnded) {
		return;
	}
	if (isAnEmptySpot(row, col)) {
		board[row][col].innerText = players[0];
		board[row][col].className = "gameTile " + players[0];
		if (thereIsAWinner()) {
			annoucements.innerText = players[0] + " has won";
			gameEnded = true;
			return;
		}
		players.push(players.shift());
	} else {
		annoucements.innerText = "Invalid move, space is occupied already";
		return;
	}
	if (!thereIsAWinner() && boardIsFull()) {
		annoucements.innerText = "Tie!";
		gameEnded = true;
		return;
	}
	annoucements.innerText = "";
	updateUI();
}
function updateUI() {
	currentlyPlayingPlayer.innerText = players[0];
	currentlyPlayingPlayer.className = "currentPlayer " + players[0];
}
function resetGame() {
	gameEnded = false;
	board.forEach((array) => {
		array.forEach((tile) => {
			tile.innerText = "";
		});
	});
	annoucements.innerText = "";
}
function boardIsFull() {
	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 3; col++) {
			if (board[row][col].innerText == "") {
				return false;
			}
		}
	}
	return true;
}
function thereIsAWinner() {
	//check rows
	for (let row = 0; row < 3; row++) {
		if (equals(board[row][0], board[row][1], board[row][2])) {
			console.log("row" + row + " winner");
			return true;
		}
	}
	//check columns
	for (let col = 0; col < 3; col++) {
		if (equals(board[0][col], board[1][col], board[2][col])) {
			console.log("col " + col + " winner");
			return true;
		}
	}
	//
	//check diagonals
	//
	//check left diag \
	if (equals(board[0][0], board[1][1], board[2][2])) {
		console.log("left  diag winner");
		return true;
	}
	//check right diag /
	if (equals(board[0][2], board[1][1], board[2][0])) {
		console.log("right / diag winner");
		return true;
	}
	return false;
}
function isAnEmptySpot(row, col) {
	if (board[row][col].innerText == "") {
		return true;
	} else {
		return false;
	}
}
function logSquare() {
	console.log(board);
}

function equals(a, b, c) {
	return a.innerText == b.innerText && b.innerText == c.innerText && c.innerText != "";
}
function containsEmptySpot(a, b, c) {}
