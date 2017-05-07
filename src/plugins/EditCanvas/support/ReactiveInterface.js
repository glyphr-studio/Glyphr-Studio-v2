import Destroyable from "./Destroyable";
import CanvasCursor from "./CanvasCursor";

export default class ReactiveInterface extends Destroyable {
  _hasHover = false;
  _onHover = [];
  _onBlur = [];

  /**
   *
   * @param {HTMLCanvasElement} canvas
   * @param {Item} item – item to monitor the hover state on
   */
  constructor(canvas, item) {
    super();

    let mouseEnterHandler = () => {
      this._hasHover = true;
      this._onHover.forEach((callback) => {
        callback();
      });

      let mouseLeaveHandler = () => {
        this._hasHover = false;
        this._onBlur.forEach((callback) => {
          callback();
        });
        item.off("mouseleave", mouseLeaveHandler);
      };

      item.on("mouseleave", mouseLeaveHandler);
    };

    item.on("mouseenter", mouseEnterHandler);

    this.onDestroy(() => {
      item.off("mouseenter", mouseEnterHandler);
      item.off("mouseleave", mouseLeaveHandler);
    })
  }

  get hasHover() {
    return this._hasHover;
  }

  onHover(handler) {
    this._onHover.push(handler);
  }

  removeOnHover(handler) {
    this._onHover.splice(this._onHover.indexOf(handler) - 1, 1);
  }

  onBlur(handler) {
    this._onBlur.push(handler);
  }

  removeOnBlur(handler) {
    this._onBlur.splice(this._onBlur.indexOf(handler) - 1, 1);
  }

  activate() {

  }
}