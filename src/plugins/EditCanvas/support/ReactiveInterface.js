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
    this.cursor = new CanvasCursor(canvas, () => "default");

    let canvasHandler = () => {
      this._onHover.forEach((callback) => {
        callback();
      })
    };

    let setHover = () => {
      this._hasHover = true;

      canvasHandler();

      ["keydown", "keyup", "keypress", "mousedown", "mouseup"].forEach((event) => {
        canvas.addEventListener(event, canvasHandler);
      });

      item.attach("mouseleave", mouseLeaveHandler)
    };

    let mouseLeaveHandler = () => {
      ["keydown", "keyup", "keypress", "mousedown", "mouseup"].forEach((event) => {
        canvas.removeEventListener(event, canvasHandler);
      });

      this._hasHover = false;

      this._onBlur.forEach((callback) => {
        callback();
      });
      item.detach("mouseleave", mouseLeaveHandler);
    };

    item.attach("mouseenter", setHover);
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