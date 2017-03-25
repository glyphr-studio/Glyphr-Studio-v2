import {storage} from "./../../../../lib/storage/Storage";
import {config} from "./../../../../config/config";

export default class PanToolStorage {
  _panPosition = "panPosition";
  _canvas;
  _unicode;

  constructor(unicode, canvas) {
    this._canvas = canvas;
    this.unicode = unicode;

    if(this.getGlyphPanPosition(this._unicode) === null) {
      this.setGlyphPanPosition(this._unicode, this.getGlyphPanPosition(this._unicode));
    }
  }

  _path = {
    input (x) {
      return ['panTool', x].join('.').replace(/[ -]/g, '_');
    }
  };

  set unicode(unicode) {
    this._unicode = unicode;
  }

  get unicode() {
    return this._unicode;
  }

  /**
   * Set pan position
   * @param {string} unicode
   * @param {{x,y}} value
   */
  setGlyphPanPosition(unicode, value) {
    let _this = this;

    storage.set(this._path.input([unicode, this._panPosition].join(".")), {
      position: value,
      canvasWidth: _this._canvas.getAttribute("width"),
      canvasHeight: _this._canvas.getAttribute("height")
    });
  }

  /**
   * Get pan position relative to the current canvas size
   * @param {string} unicode
   */
  getGlyphPanPosition(unicode) {
    let panData = storage.get(this._path.input([unicode, this._panPosition].join(".")));
    let _this = this;

    if(panData === null) {
      return {
        x: _this._canvas.getAttribute("width")/3000*1000,
        y: -_this._canvas.getAttribute("height")/3000*500};
    } else {
      let panX = this._canvas.getAttribute("width")/panData.canvasWidth * panData.position.x;
      let panY = this._canvas.getAttribute("height")/panData.canvasHeight * panData.position.y;

      return {x: panX, y: panY};
    }
  }
}