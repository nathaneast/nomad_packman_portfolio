import { INTRODUCE } from '../../util/modalSentence';

export default class Header {
  constructor({ $target, visibleModal }) {
    this.header = document.createElement('div');
    this.header.className = 'game-header';
    $target.appendChild(this.header);

    this.render();
  }

  setState(score) {
    this.score = score;
    this.render();
  }

  render () {
    this.header.innerHTML = `
      <button onclick=${() => visibleModal(INTRODUCE)}>설명보기</button>
      <button onclick=${() => visibleModal(INTRODUCE)}>랭킹보기</button>
      `;
  }
}
