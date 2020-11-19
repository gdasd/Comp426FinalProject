import keypress from 'keypress';
import Game from "./game.js";

keypress(process.stdin);

//Code in this file used to run game in console
let game = new Game(25, 15);
console.log(game.toString())

game.onChange(gameState => {
    console.log(game.toString());
})

game.onLose(gameState => {
    console.log("Game over!")
    console.log(game.toString());
})

process.stdin.on('keypress', function (ch, key) {
    switch (key.name) {
        case 'right':
            game.move('right');
            break;
        case 'left':
            game.move('left');
            break;
        case 'down':
            game.move('down');
            break;
        case "a":
            game.rotate("left");
            break;
        case "d":
            game.rotate("right");
            break;
    }
    if (key && key.ctrl && key.name == 'p') {
        process.stdin.pause();
    }
})

process.stdin.setRawMode(true);
process.stdin.resume();