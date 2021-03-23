import { LEVEL, OBJECT_TYPE, createItemAtLevel, CLASS_LIST } from '../../util/setup';
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
  constructor({ $target, redirectProtfolio, handleModal }) {
    this.redirectProtfolio = redirectProtfolio;

    console.log($target, 'Game $target');

    this.$gameBoard = document.createElement('div');
    this.$gameBoard.className = 'game-board';

    this.header = new Header({
      $target,
      handleModal,
    });
    // 클릭시 해당 모달 발생 fn

    $target.appendChild(this.$gameBoard);
    this.board = Board.createGameBoard(this.$gameBoard, LEVEL);
    // 게임 승리 -> 포트폴리오 이동 fn

    this.scoreRow = new ScoreRow({
      $target,
    });

    this.interface = new Interface({
      $target,
      onStartGame: () => this.startGame(),
    });
  }

  // Game Constants
  POWER_PILL_TIME = 10000; // ms
  GLOBAL_SPEED = 80; // ms

  // Charactor
  // pacman = null;
  // ghosts = null;

  // Init Setup
  timer = null;
  gameWin = false;
  powerPillActive = false;
  powerPillTimer = null;
  itemCount = 0;
  score = 0;

  addScore(num) {
    this.score += num;
    this.scoreRow.setState(this.score);
  }

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
        this.addScore(100);
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
      this.addScore(10);
    }

    // power pill 먹었을시
    if (this.board.objectExist(pacman.pos, OBJECT_TYPE.PILL)) {
      this.playAudio(soundPill);

      this.board.removeObject(pacman.pos, [OBJECT_TYPE.PILL]);
      pacman.powerPill = true;
      this.addScore(50);

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

    // 아이템을 먹었을때
    if (this.board.objectExist(pacman.pos, ['item'])) {
      this.itemCount++;
      this.addScore(200);
      clearInterval(this.timer);

      const itemId = this.board.getCurrentNode(pacman.pos).dataset.itemId;

      this.board.removeObject(pacman.pos, [  
        'item',
        CLASS_LIST[Number(itemId)]
      ]);
      this.board.removeItem(pacman.pos);

      // 아이템 모두 먹은 경우 작업
      // 해당 먹은 아이템으로 모달 띄우기

      // setTimeout(() => {
      //   console.log('3초 후 게임 재시작');
      //   this.timer = setInterval(
      //     () => this.gameLoop(pacman, ghosts),
      //     this.GLOBAL_SPEED
      //   );
      // }, 3000);
    }


    // dot 모두 먹었을시 게임 승리
    // if (this.board.dotCount === 0) {
    //   this.gameWin = true;
    //   this.gameOver(pacman);
    // }
  }

  startGame() {
    this.playAudio(soundGameStart);

    this.board = Board.createGameBoard(this.$gameBoard, createItemAtLevel());

    this.scoreRow.initState();

    this.gameWin = false;
    this.powerPillActive = false;
    this.score = 0;

    document.querySelector('.start-button').classList.add('hide');

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
