import Game from './components/game/Game.js';
// import portfolio from './components/Portfolio.js';
// import modal from './components/Modal.js';

export default class App {
  constructor($target) {
    this.endGame = false;

    this.game = () => new Game({
      $target,
      redirectProtfolio: this.handleMainContents,
      visibleModal: this.visibleModal,
    });

    // this.portfolio = () => new Portfolio({ $target });

    this.modal = () => new Modal({ $target });

    this.render();
  }

  visibleModal(sentence) {// CONST 스트링값 받아서 뿌려줌
    // visible 클래스 추가
    // modal Setstate에 해당 컨텐츠 추가
  }

  handleMainContents() {
    this.endGame = !this.endGame;
    this.render();
  }

  render() {
    if (this.endGame) {
      // 포폴
    } else {
      this.game();
    }
  }
}
