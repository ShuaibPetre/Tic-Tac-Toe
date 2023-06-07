function Gameboard () {
    let rows = 3;
    let columns = 3;
    let board = [];
    let turn = true
    //creating two arrays for board
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
          board[i].push(Cell());
        }
      }
      const getTurn = () => turn
      const getBoard = () => board;
      const dropToken = (row, column, player) => {
       
        const availableCells = board.map((row) => row.map((cell) => cell.getValue()))

    //if (!availableCells.length) return;
    check = board[row][column];
    if (check.getValue() !== '') {
        alert('error, slot filled, try again');
        turn = false
        return
        }
    board[row][column].addToken(player);
    turn = true
    }
        return { getBoard, dropToken, getTurn };
}
function Cell() {
    let value = '';

    const addToken = (player) => {
      value = player;
    };
  
    const getValue = () => value;
  
    return {
      addToken,
      getValue
    };
  }
function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
  ) {
    const board = Gameboard();
  
    const players = [
        {
          name: playerOneName,
          token: 'X'
        },
        {
          name: playerTwoName,
          token: 'O'
        }
      ];
  
    let activePlayer = players[0];
  
    const switchPlayerTurn = () => {
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;
    const getPlayerOne = () => players[0].name;
    const getPlayerTwo = () => players[1].name;
    const getPlayerOneToken = () => players[0].token;
    const getPlayerTwoToken = () => players[1].token;
    
    const playRound = (row, column) => {
      console.log(`Dropping ${getActivePlayer().name}'s token ${getActivePlayer().token} into ${row} & ${column}..`);
      board.dropToken(row, column, getActivePlayer().token);
  
      /*  This is where we would check for a winner and handle that logic,
          such as a win message. */
          number = board.getBoard()[1]
        //console.log(number.getValue())
        console.log(number)
      if (board.getTurn() === true) switchPlayerTurn();
    };
    return {
      playRound,
      getActivePlayer,
      getBoard: board.getBoard,
      getPlayerOne,
      getPlayerTwo,
      getPlayerOneToken,
      getPlayerTwoToken
    };
  }

  function ScreenController() {
    const game = GameController();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
  
    const updateScreen = () => {
      boardDiv.textContent = "";
      // get the newest version of the board and player turn
      const board = game.getBoard();
      const activePlayer = game.getActivePlayer();
  
      // Display player's turn
      playerTurnDiv.textContent = `${activePlayer.name}'s turn...`
  
      // Render board squares
      cellindex = 0
      board.forEach((row,rowindex) => {
        
        row.forEach((cell, index) => {
          const cellButton = document.createElement("button");
          cellButton.classList.add("cell");
          cellButton.dataset.column = index;
          cellButton.dataset.rows = rowindex;
          cellButton.dataset.cell = cellindex;
          cellButton.textContent = cell.getValue();
          if (cell.getValue() === game.getPlayerTwoToken()) {
            cellButton.style.textShadow = '0 0 20px #fff, 0 0 30px #4003e6, 0 0 40px #4003e6, 0 0 50px #4003e6, 0 0 60px #4003e6, 0 0 70px #4003e6, 0 0 80px #4003e6'
            cellButton.style.color = '#9461fd'
          }
          console.log(game.getPlayerOne());
          boardDiv.appendChild(cellButton);
          cellindex = cellindex + 1;
        })
      })
    }
  
    // Add event listener for the board
    function clickHandlerBoard(e) {
      const selectedColumn = e.target.dataset.column;
      const selectedRow = e.target.dataset.rows;
      if (!selectedColumn) return;
      game.playRound(selectedRow,selectedColumn);
      updateScreen();
    }
    boardDiv.addEventListener("click", clickHandlerBoard);
  
    // Initial render
    updateScreen();
  
    // We don't need to return anything from this module because everything is encapsulated inside this screen controller.
  }
  const game = GameController();
  ScreenController();