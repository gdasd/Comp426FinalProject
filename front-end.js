import Game from './game.js'

let game = new Game(25, 15);

const grid = document.querySelector('.grid');
const score = document.querySelector('.score');
let gridSquares = [];
let gameOver = false;

let renderLeaderboard = async function() {
    let lead = $('<div class="leaderboard"></div>');
    lead.append($('<div class="title">LeaderBoard</div>'));
    let scoreList = $('<ol></ol>')
    let result = await axios({
        method: 'get',
        url: 'https://cryptic-hamlet-31330.herokuapp.com/users',
      //  withCredentials: true,
      });
      for (let i = 0; i < 50; i++) {
        let score = $(`<li>${result.data[i]}</li>`);
        scoreList.append(score);
    }
    lead.append(scoreList);
    $(`.grid`).replaceWith(lead);
}

// Create the grid-based game board on the screen and load the Tetris pieces
function createBoard(gameState) {
    let board = gameState.board;
    score.innerHTML = "Score: " + gameState.score;
    for (let i = 0; i < game.height; i++) {
        for (let j = 0; j < game.width; j++) {
            let square = document.createElement('div');
            square.id = i;

            switch (board[i][j]) {
                case "a":
                    square.style.backgroundColor = 'red';
                    break;
                case "b":
                    square.style.backgroundColor = 'blue';
                    break;
                case "c":
                    square.style.backgroundColor = 'green';
                    break;
                case "x":
                    square.style.backgroundColor = 'yellow';
                    break;
                case "y":
                    square.style.backgroundColor = 'orange';
                    break;
                case "z":
                    square.style.backgroundColor = 'purple';
                    break;
            }

            grid.appendChild(square);
            gridSquares.push(square);
        }
    }
}

// Clear the game board
function clearBoard() {
    gridSquares = [];
    while (grid.hasChildNodes()) {
        grid.removeChild(grid.lastChild);
    }
}

// Move the Tetris pieces on the screen when a button is pressed
async function move(direction) {
    if (!game.state.over) {
        switch (direction) {
            case 'ArrowRight' || 'Right':
                clearBoard();
                game.move('right');
                createBoard(game.getGameState());
                break;
            case 'ArrowLeft' || 'Left':
                clearBoard();
                game.move('left');
                createBoard(game.getGameState());
                break;
            case 'ArrowDown' || 'Down':
                clearBoard();
                game.move('down');
                createBoard(game.getGameState());
                break;
            case 'a':
                clearBoard();
                game.rotate('left');
                createBoard(game.getGameState());
                break;
            case 'd':
                clearBoard();
                game.rotate('right');
                createBoard(game.getGameState());
                break;
        }
    } else {
        if (!gameOver) {
            window.clearInterval(intervalID);
            let img = document.createElement('img');
            img.id = "game_over";
            img.src = "Tetris 426 Game Over.png";
            img.alt = "Game Over";
            document.querySelector('.header').appendChild(img);
            gameOver = true;
            await renderLeaderboard();
        }
    }
}

// Call the move function when a key is pressed
async function keyDown(e) {
    e.preventDefault();
    await move(e.key);
}

// Made specifically for the Tetris pieces to automatically fall, this moves the pieces down
async function moveDown(down) {
    await move(down);
}

// Add event listeners to listen to key presses and to create the game board when the page is first loaded
document.addEventListener('keydown', keyDown);
document.addEventListener('DOMContentLoaded', () => {
    createBoard(game.getGameState());
})

// Automatically make the Tetris pieces on the screen fall every 1s
let intervalID = window.setInterval(async function() {
    await moveDown('ArrowDown');
}, 1000);




let handleLogOutButtonPress = async function (event) {
    try {
    let s = await axios({
        method: 'get',
        url: 'http://localhost:3030/logout',
      //  withCredentials: true,
      });
      window.location.href = "/index.html";
    } catch(err) {
        
    }
};


$(async function() {    
    $('.logout-button').on('click', (e) => {
        handleLogOutButtonPress(e);
    });
});