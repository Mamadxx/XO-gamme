const cells = document.querySelectorAll(".cell");
const turnText = document.getElementById("turn");
const restartButton = document.getElementById("restart");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameRunning = true;

const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach((cell, index) => {

    cell.addEventListener("click", function () {

        console.log("Clicked cell:", index);

        if (!gameRunning) return;

        if (board[index] !== "") return;

        board[index] = currentPlayer;

        cell.textContent = currentPlayer;

        if (currentPlayer === "X") {
            cell.classList.add("x");
        } else {
            cell.classList.add("o");
        }

        checkWinner();
    });
});

function checkWinner() {

    for (const combination of wins) {

        const [a, b, c] = combination;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {

            turnText.textContent = `🎉 ${currentPlayer} برنده شد!`;

            gameRunning = false;

            return;
        }
    }

    if (!board.includes("")) {

        turnText.textContent = "🤝 بازی مساوی شد";

        gameRunning = false;

        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    turnText.textContent = `نوبت ${currentPlayer}`;
}

restartButton.addEventListener("click", restartGame);

function restartGame() {

    board = ["", "", "", "", "", "", "", "", ""];

    currentPlayer = "X";

    gameRunning = true;

    turnText.textContent = "نوبت X";

    cells.forEach(cell => {

        cell.textContent = "";

        cell.classList.remove("x", "o");

    });
}
