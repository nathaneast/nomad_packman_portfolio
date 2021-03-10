export default class Interface {
  constructor({ $target, onStartGame }) {
    this.interface = document.createElement('div');
    this.interface.className = 'interface';
    this.onStartGame = onStartGame;

    $target.appendChild(this.interface);

    this.render();
  }
  
  render() {
    this.interface.innerHTML = `
      <button class="start-button">
        게임시작
      </button>
    `;
    
    document.querySelector('.start-button').onclick = this.onStartGame;
  }

}
