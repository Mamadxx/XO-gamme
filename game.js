```javascript
const cells = document.querySelectorAll(".cell");
const turnText = document.getElementById("turn");
const restartButton = document.getElementById("restart");

let board = ["", "", "", "", "", "", "", "",];

let currentPlayer = "X";
let gameRunning = true;

const PLAYER = "X";
const COMPUTER = "O";

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


// ==========================
// حرکت کاربر
// ==========================

cells.forEach((cell, index) => {

    cell.addEventListener("click", function () {

        if (!gameRunning) return;

        // فقط در نوبت کاربر
        if (currentPlayer !== PLAYER) return;

        // اگر خانه پر است
        if (board[index] !== "") return;

        // قرار دادن X
        board[index] = PLAYER;

        cell.textContent = PLAYER;
        cell.classList.add("x");

        // بررسی برنده
        if (checkWinner()) {
            return;
        }

        // نوبت کامپیوتر
        currentPlayer = COMPUTER;

        turnText.textContent = "🤖 نوبت کامپیوتر...";

        // کمی تأخیر برای طبیعی‌تر شدن بازی
        setTimeout(computerMove, 500);
    });
});


// ==========================
// حرکت کامپیوتر
// ==========================

function computerMove() {

    if (!gameRunning) return;

    const move = findBestMove();

    if (move === -1) return;

    // قرار دادن O
    board[move] = COMPUTER;

    cells[move].textContent = COMPUTER;
    cells[move].classList.add("o");

    // بررسی برنده
    if (checkWinner()) {
        return;
    }

    // برگشت نوبت به کاربر
    currentPlayer = PLAYER;

    turnText.textContent = "نوبت شما (X)";
}


// ==========================
// پیدا کردن حرکت مناسب
// ==========================

function findBestMove() {

    const emptyCells = [];

    for (let i = 0; i < board.length; i++) {

        if (board[i] === "") {
            emptyCells.push(i);
        }
    }

    if (emptyCells.length === 0) {
        return -1;
    }


    // --------------------------
    // اول: اگر کامپیوتر می‌تواند
    // برنده شود، همان حرکت را انجام بده
    // --------------------------

    for (const index of emptyCells) {

        board[index] = COMPUTER;

        if (hasWinner(COMPUTER)) {

            board[index] = "";

            return index;
        }

        board[index] = "";
    }


    // --------------------------
    // دوم: اگر کاربر می‌تواند
    // برنده شود، جلوی او را بگیر
    // --------------------------

    for (const index of emptyCells) {

        board[index] = PLAYER;

        if (hasWinner(PLAYER)) {

            board[index] = "";

            return index;
        }

        board[index] = "";
    }


    // --------------------------
    // سوم: گرفتن مرکز
    // --------------------------

    if (board[4] === "") {
        return 4;
    }


    // --------------------------
    // چهارم: گرفتن گوشه
    // --------------------------

    const corners = [0, 2, 6, 8];

    const availableCorners = corners.filter(
        index => board[index] === ""
    );

    if (availableCorners.length > 0) {

        return availableCorners[
            Math.floor(Math.random() * availableCorners.length)
        ];
    }


    // --------------------------
    // پنجم: یک خانه خالی تصادفی
    // --------------------------

    return emptyCells[
        Math.floor(Math.random() * emptyCells.length)
    ];
}


// ==========================
// بررسی برنده
// ==========================

function hasWinner(player) {

    for (const combination of wins) {

        const [a, b, c] = combination;

        if (
            board[a] === player &&
            board[b] === player &&
            board[c] === player
        ) {
            return true;
        }
    }

    return false;
}


// ==========================
// بررسی نتیجه بازی
// ==========================

function checkWinner() {

    if (hasWinner(PLAYER)) {

        turnText.textContent = "🎉 شما برنده شدید!";

        gameRunning = false;

        return true;
    }


    if (hasWinner(COMPUTER)) {

        turnText.textContent = "🤖 کامپیوتر برنده شد!";

        gameRunning = false;

        return true;
    }


    if (!board.includes("")) {

        turnText.textContent = "🤝 بازی مساوی شد";

        gameRunning = false;

        return true;
    }


    return false;
}


// ==========================
// بازی دوباره
// ==========================

restartButton.addEventListener("click", restartGame);


function restartGame() {

    board = ["", "", "", "", "", "", "", ""];

    currentPlayer = PLAYER;

    gameRunning = true;

    turnText.textContent = "نوبت شما (X)";

    cells.forEach(cell => {

        cell.textContent = "";

        cell.classList.remove("x", "o");

    });
}
```
