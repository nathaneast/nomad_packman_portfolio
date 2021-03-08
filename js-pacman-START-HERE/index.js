import { LEVEL, OBJECT_TYPE } from './setup';
import { randomMovement } from './ghostmoves';

// Classes
import GameBoard from './gameBoard';
import Pacman from './Pacman';
import Ghost from './Ghost';

// Dom Ele
const gameGrid = document.querySelector('#game');
const scoreTable = document.querySelector('#score');
const startButton = document.querySelector('#start-button');

// Game Constants
const POWER_PILL_TIME = 10000; // ms
const GLOBAL_SPEED = 80; // ms
const gameBoard = GameBoard.createGameBoard(gameGrid, LEVEL)

// Init Setup
let score = 0;
let timer = null;
let gameWin = false;
let powerPillActive = false;
let powerPillTimer = null;

function gameOver(pacman, grid) {

}

function checkCollision(pacman, ghosts) {

}

function gameLoop(pacman, ghosts) {
  gameBoard.moveCharacter(pacman);

  ghosts.forEach((ghost) => gameBoard.moveCharacter(ghost));
}

function startGame() {
  gameWin = false;
  powerPillActive = false;
  score = 0;

  gameBoard.createGrid(LEVEL);

  const pacman = new Pacman(2, 287);
  gameBoard.addObject(287, [OBJECT_TYPE.PACMAN]);
  // 팩맨 위치에 팩맨 클래스 추가

  document.addEventListener('keydown', (e) => 
    pacman.handleKeyInput(e, gameBoard.objectExist.bind(gameBoard))
  );

  const ghosts = [
    new Ghost(5, 188, randomMovement, OBJECT_TYPE.BLINKY),
    new Ghost(4, 209, randomMovement, OBJECT_TYPE.PINKY),
    new Ghost(3, 230, randomMovement, OBJECT_TYPE.INKY),
    new Ghost(2, 251, randomMovement, OBJECT_TYPE.CLYDE)
  ];

  //Game Loop
  timer = setInterval(() => gameLoop(pacman, ghosts), GLOBAL_SPEED);
}

// Init game
startButton.addEventListener('click', startGame);
