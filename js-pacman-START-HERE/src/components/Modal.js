export default class Modal {
  constructor($target) {
    this.$modal = document.createElement('div');
    this.$modal.className = 'modal';
    $target.appendChild(this.$modal);

    this.render();
  }

  render() {

  }
}
