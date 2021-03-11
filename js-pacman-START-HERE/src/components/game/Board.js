import {
  GRID_SIZE,
  CELL_SIZE,
  OBJECT_TYPE,
  CLASS_LIST,
} from '../../util/setup';

export default class Board {
  constructor({ $gameBoard }) {
    this.$gameBoard = $gameBoard;
    this.dotCount = 0;
    this.grid = [];
  }

  showGameStatus(gameWin) {
    const div = document.createElement('div');
    div.classList.add('game-status');
    div.innerHTML = `${gameWin ? 'win!' : 'lose!'}`;
    this.$gameBoard.appendChild(div);
  }

  createGrid(level) {
    this.dotCount = 0;
    this.grid = [];
    this.$gameBoard.innerHTML = '';
    this.$gameBoard.style.cssText = `grid-template-columns: repeat(${GRID_SIZE}, ${CELL_SIZE}px);`;

    level.forEach((square) => {
      const div = document.createElement('div');
      div.classList.add('square', CLASS_LIST[square]);
      div.style.cssText = `width: ${CELL_SIZE}px; height: ${CELL_SIZE}px;`;

      if (square >= 10) {
        switch (square) {
          case 10:
            div.innerText = '📞';
            break;
          case 11:
            div.innerText = '🚀';
            break;
          case 12:
            div.innerText = '🔧';
            break;
          case 13:
            div.innerText = '🧑';
            break;
          default:
            square
        }
        div.classList.add('item', CLASS_LIST[square]);
      }

      this.$gameBoard.appendChild(div);
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
  
  // static createGameBoard(DOMGrid, level) {
  static createGameBoard(domEle, level) {
    const board = new this({ $gameBoard: domEle });
    board.createGrid(level);
    return board;
  }
}
