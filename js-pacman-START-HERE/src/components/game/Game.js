import { LEVEL, OBJECT_TYPE } from '../../util/setup';
import { randomMovement } from '../../util/ghostmoves';

// Sounds
import soundDot from '../../sounds/munch.wav';
import soundPill from '../../sounds/pill.wav';
import soundGameStart from '../../sounds/game_start.wav';
import soundGameOver from '../../sounds/death.wav';
import soundGhost from '../../sounds/eat_ghost.wav';

// Components
import Header from './Header';
import Board from './Board';
import ScoreRow from './ScoreRow';
import Interface from './Interface';
import Pacman from '../Pacman';
import Ghost from '../Ghost';

export default class Game {
  constructor({ $target, redirectProtfolio, visibleModal }) {
    // this.$target = $target;
    this.redirectProtfolio = redirectProtfolio;

    this.$gameBoard = document.createElement('div');
    this.$gameBoard.className = 'game-board';

    this.header = new Header({
      $target,
      visibleModal,
    });
    // 클릭시 해당 모달 발생

    $target.appendChild(this.$gameBoard);
    this.board = Board.createGameBoard(this.$gameBoard);
    // 점수 오를시 score.setState
    // 게임 승리 -> 포트폴리오 이동

    this.scoreRow = new ScoreRow({
      $target,
    });

    this.interface = new Interface({
      $target,
      onStartGame: () => this.startGame(),
    });
    // 시작버튼 클릭 -> 게임시작 로직 실행
  }

  // Game Constants
  POWER_PILL_TIME = 10000; // ms
  GLOBAL_SPEED = 80; // ms

  // Init Setup
  timer = null;
  gameWin = false;
  powerPillActive = false;
  powerPillTimer = null;

  playAudio(audio) {
    const soundEffect = new Audio(audio);
    soundEffect.play();
  }

  gameOver(pacman) {
    this.playAudio(soundGameOver);

    document.removeEventListener('keydown', (e) =>
      pacman.handleKeyInput(e, this.board.objectExist.bind(this.board))
    );

    this.board.showGameStatus(this.gameWin);

    clearInterval(this.timer);

    document.querySelector('.start-button').classList.remove('hide');
  }

  checkCollision(pacman, ghosts) {
    const collidedGhost = ghosts.find((ghost) => pacman.pos === ghost.pos);

    if (collidedGhost) {
      if (pacman.powerPill) {
        this.playAudio(soundGhost);

        this.board.removeObject(collidedGhost.pos, [
          OBJECT_TYPE.GHOST,
          OBJECT_TYPE.SCARED,
          collidedGhost.name,
        ]);
        collidedGhost.pos = collidedGhost.startPos;
        this.scoreRow.setState(100);
        //TODO: score setState
      } else {
        this.board.removeObject(pacman.pos, [OBJECT_TYPE.PACMAN]);
        this.board.rotateDiv(pacman.pos, 0);
        this.gameOver(pacman);
      }
    }
  }

  gameLoop(pacman, ghosts) {
    this.board.moveCharacter(pacman);
    this.checkCollision(pacman, ghosts);

    ghosts.forEach((ghost) => this.board.moveCharacter(ghost));
    this.checkCollision(pacman, ghosts);

    // dot 먹었을시
    if (this.board.objectExist(pacman.pos, OBJECT_TYPE.DOT)) {
      this.playAudio(soundDot);

      this.board.removeObject(pacman.pos, [OBJECT_TYPE.DOT]);
      this.board.dotCount--;
      this.scoreRow.setState(10);
      //TODO: score setState
    }

    // power pill 먹었을시
    if (this.board.objectExist(pacman.pos, OBJECT_TYPE.PILL)) {
      this.playAudio(soundPill);

      this.board.removeObject(pacman.pos, [OBJECT_TYPE.PILL]);
      pacman.powerPill = true;
      this.scoreRow.setState(50);
      //TODO: score setState

      clearTimeout(this.powerPillTimer);
      this.powerPillTimer = setTimeout(
        () => (pacman.powerPill = false),
        this.POWER_PILL_TIME
      );
    }

    // power pill 모드, 고스트 scare 핸들링
    if (pacman.powerPill !== this.powerPillActive) {
      this.powerPillActive = pacman.powerPill;
      ghosts.forEach((ghost) => (ghost.isScared = pacman.powerPill));
    }

    // dot 모두 먹었을시 게임 승리
    if (this.board.dotCount === 0) {
      this.gameWin = true;
      this.gameOver(pacman);
    }

    // scoreTable.innerHTML = score;
  }

  startGame() {
    this.playAudio(soundGameStart);

    this.board = Board.createGameBoard(this.$gameBoard);

    this.scoreRow.initState();

    this.gameWin = false;
    this.powerPillActive = false;
    this.score = 0;

    document.querySelector('.start-button').classList.add('hide');

    this.board.createGrid(LEVEL);

    const pacman = new Pacman(2, 287);
    this.board.addObject(287, [OBJECT_TYPE.PACMAN]);
    // 팩맨 위치에 팩맨 클래스 추가

    document.addEventListener('keydown', (e) =>
      pacman.handleKeyInput(e, this.board.objectExist.bind(this.board))
    );

    const ghosts = [
      new Ghost(5, 188, randomMovement, OBJECT_TYPE.BLINKY),
      new Ghost(4, 209, randomMovement, OBJECT_TYPE.PINKY),
      new Ghost(3, 230, randomMovement, OBJECT_TYPE.INKY),
      new Ghost(2, 251, randomMovement, OBJECT_TYPE.CLYDE),
    ];

    // 매초 게임 루프 실행
    this.timer = setInterval(() => this.gameLoop(pacman, ghosts), this.GLOBAL_SPEED);
  }
}
