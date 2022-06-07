const checkWinner = (board) => {
    for (let i = 0; i < 3; i++) {
        // check vertically
        if (board[i][0] == board[i][1] && board[i][1] == board[i][2]) {
            return {win: true, winner: board[i][0]};
        }
        // check horizontally
        if (board[0][i] == board[1][i] && board[1][i] == board[2][i]) {
            return {win: true, winner: board[0][i]};
        }
    }
    // check diagonally
    if ((board[0][0] == board[1][1]) && (board[1][1] == board[2][2])) {
        return {win: true, winner: board[0][0]};
    } else if (board[0][2] == board[1][1] && board[1][1] == board[2][0]) {
        return {win: true, winner: board[0][2]};
    }
    return {win: false, winner: null};
}

const findLocation = (location) => {
    let row = Math.floor(location/3);
    if (location%3 == 0) {
        row--;
    }
    let column = 0;
    if (location%3 == 0) {
         column = 2;
    } else {
         column = location%3 - 1;
    }
    return {row, column};
}

const changeMatrix = (location, board, sign) => {
    const coordinates = findLocation(location);
    board[coordinates.row][coordinates.column] = sign;
}

const play = (box, sign) => {
    const p = document.createElement("p");
    p.classList.add("big-text");
    p.textContent = sign;
    box.appendChild(p);
    changeMatrix(box.id, board, sign);
    round++;
}

// Game Matrix
let board = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

const defaultBoard = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

let round = 1;

const boxes = document.querySelectorAll(".box");
const result = document.querySelector(".winner");
const resetBtn = document.querySelector(".reset");

boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (round%2 == 1 && !box.hasChildNodes()) {
            play(box, "X");
        } else if (round%2 == 0 && !box.hasChildNodes()) {
            play(box, "O");
        }
        const winner = checkWinner(board);
        if (winner.win) {
            result.textContent = `Winner is ${winner.winner}`;
            board = defaultBoard;
        }
    });
});

resetBtn.addEventListener("click", () => {
    boxes.forEach(box => {
        box.innerHTML = "";
        result.innerHTML = "";
        round = 1;
    })
});