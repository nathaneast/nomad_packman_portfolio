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
            div.innerText = 'π';
            div.dataset['itemId'] = 10;
            break;
          case 11:
            div.innerText = 'π';
            div.dataset['itemId'] = 11;
            break;
          case 12:
            div.innerText = 'π§';
            div.dataset['itemId'] = 12;
            break;
          case 13:
            div.innerText = 'π§';
            div.dataset['itemId'] = 13;
            break;
          default:
            square;
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
    // κ²μνμ ν΄λΉ μμΉ μ λ³΄ μ κ±°
    this.grid[pos].classList.remove(...classes);
  }

  removeItem(pos) {
    this.grid[pos].innerHTML = '';
  }

  getCurrentNode(pos) {
    return this.grid[pos];
  }

  // Can have an arrow function here cause of this binding
  objectExist(pos, object) {
    return this.grid[pos].classList.contains(object);
  }

  // μΊλ¦­ν°μ λ°©ν₯ λ³κ²½
  rotateDiv(pos, deg) {
    this.grid[pos].style.transform = `rotate(${deg}deg)`;
  }

  moveCharacter(character) {
    if (character.shouldMove()) {
      const { nextMovePos, direction } = character.getNextMove(
        this.objectExist.bind(this)
      );
      const { classesToRemove, classesToAdd } = character.makeMove();

      // λ°©ν₯ μ΄λμ΄ μκ³ , μ΄μ  λ€μ μμΉκ° λ€λ₯Όλ
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
