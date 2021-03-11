export default class ScoreRow {
  constructor({ $target }) {
    this.score = 0;

    this.scoreRow = document.createElement('div');
    this.scoreRow.className = 'score';
    $target.appendChild(this.scoreRow);

    this.render();
  }
  
  initState() {
    this.score = 0;
    this.render();
  }

  setState(score) {
    this.score += score;
    this.render();
  }

  render () {
    this.scoreRow.innerHTML = `
        <span>${this.score}</span>
      `;
  }
}
