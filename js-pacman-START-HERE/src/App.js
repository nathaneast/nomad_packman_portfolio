import Game from './components/game/Game.js';
// import portfolio from './components/Portfolio.js';
import modal from './components/Modal.js';

export default class App {
  constructor($target) {
    this.endGame = false;
    this.isModal = false;

    this.$game = document.createElement('section');
    this.$game.className = 'gameSection';
    $target.appendChild(this.$game);

    this.$portfolio = document.createElement('section');
    this.$portfolio.className = 'portfolioSection';
    $target.appendChild(this.$portfolio);
    
    this.$modal = document.createElement('section');
    this.$modal.className = 'modalSection';
    $target.appendChild(this.$modal);

    // game에서$game this 못찾음
    this.game = () => new Game({
      $game: this.$game,
      handleModal: this.handleModal,
      // redirectProtfolio: this.handleModal,
    });
    // 게임 끝나고 score 포폴에 넘겨줘야함
    
    this.render();
  }
  // this.portfolio = () => new Portfolio({ $target });
  
  handleModal() {// CONST 스트링값 받아서 뿌려줌
    this.isModal = !this.isModal;

    this.$modal.innerText = ``;

    // modal Setstate에 해당 컨텐츠 추가
    if (this.isModal) {
      // this.modal = () => new Modal({
      //    $target 
      // });
    }
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
