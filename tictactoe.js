window.addEventListener("DOMContentLoaded", () => {
	var gameTiles = Array.from(document.querySelectorAll(".gameTile"));
	var playingDisplay = document.querySelector(".display");
	var resetButton = document.querySelector("#btnReset");
	var annoucements = document.querySelector(".announcement");
	resetButton.addEventListener("click", setupGame);
	var board = [
		[gameTiles[0], gameTiles[1], gameTiles[2]],
		[gameTiles[3], gameTiles[4], gameTiles[5]],
		[gameTiles[6], gameTiles[7], gameTiles[8]],
	];
	board.forEach((array, row) => {
		array.forEach((tile, col) => {
			tile.addEventListener("click", () => takeTurn(row, col));
		});
	});
	var players = ["X", "O"];

	function takeTurn(row, col) {
		logSquare();
		if (itsFreeRealEstate(row, col)) {
			board[row][col].innerText = players[0];
			logSquare();
			if (thereIsAWinner()) {
				logSquare();
				annoucements.innerText = players[0] + " has won";
			} else {
				players.push(players.shift());
			}
		} else if (!thereIsAWinner() && !itsFreeRealEstate) {
			annoucements.innerText = "its a tie";
		} else {
			annoucements.innerText = "Invalid move, space is occupied already";
		}
	}
	function setupGame() {
		players[0] = players[Math.floor(Math.random() * players.length)];
		board.forEach((array, row) => {
			array.forEach((tile, col) => {
				tile.innerText = "";
			});
		});
		annoucements.innerText = "";
	}
	function thereIsAWinner() {
		//check rows
		for (let row = 0; row < 3; row++) {
			if (
				board[row][0].innerText == "" ||
				board[row][1].innerText == "" ||
				board[row][2].innerText == ""
			) {
				break;
			} else if (
				board[row][0].innerText == board[row][1].innerText &&
				board[row][1].innerText == board[row][2].innerText
			) {
				console.log("row winner");
				return true;
			}
		}
		//check columns
		for (let col = 0; col < 3; col++) {
			if (
				board[0][col].innerText == "" ||
				board[1][col].innerText == "" ||
				board[2][col].innerText == ""
			) {
				break;
			} else if (
				board[0][col].innerText == board[1][col].innerText &&
				board[1][col].innerText == board[2][col].innerText
			) {
				console.log("col winner");
				return true;
			}
		}
		//
		//check diagonals
		//
		//check left diag
		if (
			!board[0][0].innerText == "" ||
			!board[1][1].innerText == "" ||
			!board[2][2].innerText == ""
		) {
			if (
				board[0][0].innerText == board[1][1].innerText &&
				board[1][1].innerText == board[2][2].innerText
			) {
				console.log("left diag winner");
				return true;
			}
		}
		//check right diag
		if (
			!board[0][2].innerText == "" ||
			!board[1][1].innerText == "" ||
			!board[2][0].innerText == ""
		) {
			if (
				board[0][2].innerText == board[1][1].innerText &&
				board[1][1].innerText == board[2][0].innerText
			) {
				console.log("right diag winner");
				return true;
			}
			return false;
		}
	}
	function itsFreeRealEstate(row, col) {
		if (board[row][col].innerText == "") {
			return true;
		} else {
			return false;
		}
	}
	function logSquare() {
		console.log(board);
	}
});
