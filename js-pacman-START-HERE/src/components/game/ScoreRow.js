export default class ScoreRow {
  constructor({ $target }) {
    this.score = 0;

    this.scoreRow = document.createElement('div');
    this.scoreRow.className = 'score';
    $target.appendChild(this.scoreRow);

    this.render();
  }

  setState(score) {
    this.score = score;
    this.render();
  }

  render () {
    this.scoreRow.innerHTML = `
        <span>${0}</span>
      `;
  }
}
