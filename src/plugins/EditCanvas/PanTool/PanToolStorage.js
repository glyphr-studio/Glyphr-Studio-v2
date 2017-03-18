import {storage} from "./../../../lib/storage/Storage";
import {config} from "./../../../config/config";

export default class PanToolStorage {
  _panPosition = "panPosition";
  _canvas;
  constructor(unicode, canvas) {
    this._canvas = canvas;

    if(this.getGlyphPanPosition(unicode) === null) {
      this.setGlyphPanPosition(unicode,
        // middle of the canvas {x: 0, y: 0}
        {
          x: canvas.getAttribute("width")/3000*1000,
          y: -canvas.getAttribute("height")/3000*500
        });
    }
  }

  _path = {
    input (x) {
      return ['panTool', x].join('.').replace(/[ -]/g, '_');
    }
  };

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
    if(panData === null) {
      return null;
    } else {
      let panX = this._canvas.getAttribute("width")/panData.canvasWidth * panData.position.x;
      let panY = this._canvas.getAttribute("height")/panData.canvasHeight * panData.position.y;

      return {x: panX, y: panY};
    }
  }
}