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
    this.redirectProtfolio = redirectProtfolio;

    this.header = new Header({
      $target,
      visibleModal,
    });
    // 클릭시 해당 모달 발생

    this.board = new Board({
      $target,
    });
    // 점수 오를시 score.setState
    // 게임 승리 -> 포트폴리오 이동

    this.score = new ScoreRow({
      $target,
    });

    this.interface = new Interface({
      $target,
      onStartGame: this.startGame,
    });
    // 시작버튼 클릭 -> 게임시작 로직 실행
  }
      
  // Game Constants
  POWER_PILL_TIME = 10000; // ms
  GLOBAL_SPEED = 80; // ms

  // Init Setup
  score = 0;
  timer = null;
  gameWin = false;
  powerPillActive = false;
  powerPillTimer = null;

  playAudio(audio) {
    const soundEffect = new Audio(audio);
    soundEffect.play();
  }

  startGame() {
    // this.playAudio(soundGameStart);

    // const soundEffect = new Audio(soundGameStart);
    // soundEffect.play();
  
    this.gameWin = false;
    this.powerPillActive = false;
    this.score = 0;
  
    document.querySelector('.start-button').classList.add('hide');
    // 시작버튼 hide

    console.log(this.board, this.header, 'this.board');
  
    this.board.createGrid(LEVEL);
  
    const pacman = new Pacman(2, 287);
    this.board.addObject(287, [OBJECT_TYPE.PACMAN]);
    // 팩맨 위치에 팩맨 클래스 추가
  
    document.addEventListener('keydown', (e) => 
      pacman.handleKeyInput(e, board.objectExist.bind(this.board))
    );
  
    const ghosts = [
      new Ghost(5, 188, randomMovement, OBJECT_TYPE.BLINKY),
      new Ghost(4, 209, randomMovement, OBJECT_TYPE.PINKY),
      new Ghost(3, 230, randomMovement, OBJECT_TYPE.INKY),
      new Ghost(2, 251, randomMovement, OBJECT_TYPE.CLYDE)
    ];
  
    // 매초 게임 루프 실행
    this.timer = setInterval(() => gameLoop(pacman, ghosts), GLOBAL_SPEED);
  }
}
