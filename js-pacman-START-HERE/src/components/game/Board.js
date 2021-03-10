import {
  LEVEL,
  GRID_SIZE,
  CELL_SIZE,
  OBJECT_TYPE,
  CLASS_LIST,
} from '../../util/setup';

export default class Board {
  constructor({ $target }) {
    this.dotCount = 0;
    this.grid = [];

    this.board = document.createElement('div');
    this.board.className = 'game-board';
    $target.appendChild(this.board);

    this.createGrid(LEVEL);
  }

  showGameStatus(gameWin) {
    const div = document.createElement('div');
    div.classList.add('game-status');
    div.innerHTML = `${gameWin ? 'win!' : 'lose!'}`;
    this.board.appendChild(div);
  }

  createGrid(level) {
    this.dotCount = 0;
    this.grid = [];
    this.board.innerHTML = '';
    this.board.style.cssText = `grid-template-columns: repeat(${GRID_SIZE}, ${CELL_SIZE}px);`;

    level.forEach((square) => {
      const div = document.createElement('div');
      div.classList.add('square', CLASS_LIST[square]);
      div.style.cssText = `width: ${CELL_SIZE}px; height: ${CELL_SIZE}px;`;
      this.board.appendChild(div);
      this.grid.push(div);

      // Add dots
      if (CLASS_LIST[square] === OBJECT_TYPE.DOT) this.dotCount++;
    });
  }

  addObject(pos, classes) {
    this.grid[pos].classList.add(...classes);
  }

  removeObject(pos, classes) {
    // 게임판에 해당 위치 정보 제거
    this.grid[pos].classList.remove(...classes);
  }

  // Can have an arrow function here cause of this binding
  objectExist(pos, object) {
    return this.grid[pos].classList.contains(object);
  }

  // 캐릭터의 방향 변경
  rotateDiv(pos, deg) {
    this.grid[pos].style.transform = `rotate(${deg}deg)`;
  }

  moveCharacter(character) {
    if (character.shouldMove()) {
      const { nextMovePos, direction } = character.getNextMove(
        this.objectExist.bind(this)
      );
      const { classesToRemove, classesToAdd } = character.makeMove();

      // 방향 이동이 있고, 이전 다음 위치가 다를때
      if (character.rotation && nextMovePos !== character.pos) {
        // Rotate
        this.rotateDiv(nextMovePos, character.dir.rotation);
        // Rotate the previous div back
        this.rotateDiv(character.pos, 0);
      }

      this.removeObject(character.pos, classesToRemove);
      this.addObject(nextMovePos, classesToAdd);

      character.setNewPos(nextMovePos, direction);
    }
  }
}