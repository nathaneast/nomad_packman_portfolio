import { LEVEL, OBJECT_TYPE } from './setup';

// Classes
import GameBoard from './gameBoard';
import Pacman from './Pacman';

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

function gameOver(packman, grid) {

}

function checkCollision(packman, ghosts) {

}

function gameLoop(packman, ghosts) {

}

function startGame(packman, grid) {

}

