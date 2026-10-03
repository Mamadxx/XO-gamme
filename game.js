const cells = document.querySelectorAll(".cell");

const statusText = document.getElementById("status");

const restartButton = document.getElementById("restart");

let currentPlayer = "X";

let gameActive = true;

let board = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
];


const winningPatterns = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]

];


function play(index) {

    if (!gameActive) {
        return;
    }

    if (board[index] !== "") {
        return;
    }

    board[index] = currentPlayer;

    cells[index].textContent = currentPlayer;

    checkWinner();

}


function checkWinner() {

    for (let pattern of winningPatterns) {

        const a = pattern[0];
        const b = pattern[1];
        const c = pattern[2];

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {

            statusText.textContent =
                `🏆 بازیکن ${currentPlayer} برنده شد!`;

            gameActive = false;

            return;
        }

    }


    if (!board.includes("")) {

        statusText.textContent =
            "🤝 بازی مساوی شد!";

        gameActive = false;

        return;
    }


    currentPlayer =
        currentPlayer === "X"
            ? "O"
            : "X";


    statusText.textContent =
        `نوبت ${currentPlayer}`;

}


function restartGame() {

    currentPlayer = "X";

    gameActive = true;

    board = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ];


    cells.forEach(cell => {

        cell.textContent = "";

    });


    statusText.textContent = "نوبت X";

}


cells.forEach((cell, index) => {

    cell.addEventListener(
        "click",
        () => play(index)
    );

});


restartButton.addEventListener(
    "click",
    restartGame
);