export default class Interface {
  constructor({ $target, gameStart }) {
    this.interface = document.createElement('div');
    this.interface.className = 'interface';
    this.gameStart = gameStart;

    $target.appendChild(this.interface);

    this.render();
  }

  setState(score) {
    this.score = score;
    this.render();
  }
  
  render() {
    this.interface.innerHTML = `
      <button id="start-button">Start Game</button>
    `;
  }
}
