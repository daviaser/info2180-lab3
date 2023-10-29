document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const squares = board.querySelectorAll("div");
  const status = document.getElementById("status");
  const newGameButton = document.querySelector(".btn");

  let currentPlayer = "X";
  let gameOver = false;

  // Function to style squares appropriately
  function styleSquares() {
    squares.forEach((square) => {
      square.classList.add("square");
      
      
    });
  }

  // Function to handle square click event
  function handleSquareClick() {
    if (gameOver || this.textContent !== "") return;
    this.classList.remove("hover");
    this.textContent = currentPlayer;
    this.classList.add(currentPlayer);


    if (checkWinner()) {
      status.textContent = `Congratulations! ${currentPlayer} is the Winner!`;
      status.classList.add("you-won");
      gameOver = true;
    } else if ([...squares].every((square) => square.textContent !== "")) {
      status.textContent = "It's a draw!";
      gameOver = true;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      status.textContent = `Player ${currentPlayer}'s turn`;
      console.log(`Player ${currentPlayer}'s turn`)
    }
  }

  // Function to check for a winner
  function checkWinner() {
    const waystoWin = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const match of waystoWin) {
      const [a, b, c] = match;
      if (
        squares[a].textContent &&
        squares[a].textContent === squares[b].textContent &&
        squares[b].textContent === squares[c].textContent
      ) {
        squares[a].classList.add("winner");
        squares[b].classList.add("winner");
        squares[c].classList.add("winner");
        return true;
      }
    }

    return false;
  }

  // Function to reset the game
  function resetGame() {
    squares.forEach((square) => {
      square.textContent = "";
      square.classList.remove("X", "O", "winner");
    });
    status.classList.remove("you-won");
    status.textContent = "Move your mouse over a square and click to play an X or an O.";
    currentPlayer = "X";
    gameOver = false;
  }

  // Event listener for square clicks
  squares.forEach((square) => {
    square.addEventListener("click", handleSquareClick);
    
  });

  // Event listener for mouse enter and leave events
  squares.forEach((square) => {
    square.addEventListener("mouseover", () => {
      if (square.textContent === "") {
        square.classList.add("hover");
      }
    });

    square.addEventListener("mouseleave", () => {
      if (square.textContent === "") {
        square.classList.remove("hover");
      }
    });

  });

  // Event listener for the New Game button
  newGameButton.addEventListener("click", resetGame);
  console.log("STARTED NEW GAME");
  
  // Prevent cheating by disallowing changing values of filled squares
  squares.forEach((square) => {
    square.addEventListener("click", () => {
      if (square.textContent !== "") {
        return;
      }
    });
  });

  // Style the squares on page load
  styleSquares();
});
