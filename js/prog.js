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
        if (board[a][b].getValue() == ""){
            board[a][b].addToken(player);
        }
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

    const playRound = (position) => {
        console.log(
            `Dropping ${getActivePlayer().name}'s token into the position
            ${position}...`
        );
        board.putToken(position,getActivePlayer().token);

        const winner = getWinner();

        if (winner) {
            console.log(`${getActivePlayer().name} wins!`)
        }

        switchPlayerTurn();
        printNewRound();
    }

}
