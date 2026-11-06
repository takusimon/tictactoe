const GameBoard = ( () => {
    // Create Board as a Grid Object
    const board = {
                a:["","",""],
                b:["","",""],
                c:["","",""],
    };

    const getBoard = () => board;

    const putToken = (gridItem) => {
        const [a,b] = gridItem;
        if (board[a][b]== ""){
            board[a][b] = "x";
        }
    }

    const printBoard = () => console.log(board);

    return {getBoard,putToken,printBoard};

})();