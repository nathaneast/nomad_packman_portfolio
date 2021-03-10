import ScoreRow from './ScoreRow';
import Board from './Board';
import Header from './Header';
import Interface from '../Interface';

export default class Game {
  constructor({ $target, redirectProtfolio, visibleModal }) {
    this.redirectProtfolio = redirectProtfolio;

    this.header = new Header({ 
      $target,
      visibleModal
  });
    // 클릭시 해당 모달 발생

    this.board = new Board({ 
      $target,
    });
    // 점수 오를시 score.setState
    // 게임 승리 -> 포트폴리오 이동

    this.score = new ScoreRow({ 
      $target 
    });

    this.interface = new Interface({ 
      $target,
      // onGameStart: this.gameStart,
    });
    // 시작버튼 클릭 -> 게임시작 로직 실행
  }


}
