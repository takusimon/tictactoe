function GameBoard(){
    const board = [];
    const rows = 3;
    const columns = 3;

    // Create a 3 x 3 array of objects
    for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
    }

    const getBoard = () => board;

    const putToken = (gridItem,player) => {
        const [a,b] = gridItem;
        if (board[a][b].getValue() !== ""){
            return false;
        }

        board[a][b].addToken(player);
        return true;
    }

    
     const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardWithCellValues);
  };

    return {getBoard,putToken,printBoard};

}

function Cell() {
  let value = "";

  // Accept a player's token to change the value of the cell
  const addToken = (player) => {
    value = player;
  };

  // How we will retrieve the current value of this cell through closure
  const getValue = () => value;

  return {
    addToken,
    getValue,
  };
}

function GameController (
    playerOneName = "player one",
    playerTwoName = "player two"
){
    const board = GameBoard();
    const winningCombinations = [
        // Rows
        [[0,0], [0,1], [0,2]],
        [[1,0], [1,1], [1,2]],
        [[2,0], [2,1], [2,2]],

        // Columns
        [[0,0], [1,0], [2,0]],
        [[0,1], [1,1], [2,1]],
        [[0,2], [1,2], [2,2]],

        // Diagonals
        [[0,0], [1,1], [2,2]],
        [[0,2], [1,1], [2,0]]
    ];

    const players = [
        {
            name: playerOneName,
            token: "X",
        },
        {
            name:playerTwoName,
            token: "O",
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1]:players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const getWinner = () => {
    const grid = board.getBoard();

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;

        const first = grid[a[0]][a[1]].getValue();

        if (
            first !== "" &&
            first === grid[b[0]][b[1]].getValue() &&
            first === grid[c[0]][c[1]].getValue()
        ) {
            return first;
        }
    }

    return null;
    };

    const getDraw = () => {
    const grid = board.getBoard();

    return grid.every(row =>
        row.every(cell => cell.getValue() !== "")
    );
    };

    const playRound = (position) => {
        console.log(
            `Dropping ${getActivePlayer().name}'s token into the position
            ${position}...`
        );
        const put = board.putToken(position,getActivePlayer().token);

        const winner = getWinner();

        if (!put){
            console.log("Invalid move!Try Again!");
            return;
        }
        if (winner) {
            console.log(`${getActivePlayer().name} wins!`);
            return;
        }
        if (getDraw()) {
            console.log(`It's a draw!`);
            return;
        }
        switchPlayerTurn();
        printNewRound();
    
    }

        printNewRound();

        return {
            playRound,
            getActivePlayer
        };
}


const boardContainer = document.querySelector("main");

for(let i=0;i < 3;i++){
    for (let j=0;j < 3; j++){
        const cell = document.createElement("div");
        cell.setAttribute("id",`${i}${j}`);
        cell.classList.add("grid-box");
        boardContainer.appendChild(cell);
    }
}