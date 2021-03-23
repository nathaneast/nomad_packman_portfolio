export default class ScoreRow {
  constructor({ $target }) {
    this.renderScore = 0;

    this.scoreRow = document.createElement('div');
    this.scoreRow.className = 'score';
    $target.appendChild(this.scoreRow);

    this.render();
  }
  
  initState() {
    this.renderScore = 0;
    this.render();
  }

  setState(score) {
    this.renderScore = score;
    this.render();
  }

  render () {
    this.scoreRow.innerHTML = `
        <span>${this.renderScore}</span>
      `;
  }
}
