export default class Destroyable {
  _onDestroy = [];

  onDestroy(callback) {
    this._onDestroy.push(callback);
  }

  destroy() {
    this._onDestroy.forEach((callback, i) => {
      callback();

      this._onDestroy.splice(i, 1);
    });
  }
}