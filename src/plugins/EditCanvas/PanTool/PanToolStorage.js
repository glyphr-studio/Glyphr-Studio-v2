import {storage} from "./../../../lib/storage/Storage";
import {config} from "./../../../config/config";

export default class PanToolStorage {
  _panPosition = "panPosition";

  constructor(unicode) {
    if(this.getGlyphPanPosition(unicode) === null) {
      this.setGlyphPanPosition(unicode, {x: 1400, y: 400});
    }
  }

  _path = {
    input (x) {
      return ['panTool', x].join('.').replace(/[ -]/g, '_');
    }
  };

  setGlyphPanPosition(unicode, value) {
    storage.set(this._path.input([unicode, this._panPosition].join(".")), value);
  }

  getGlyphPanPosition(unicode) {
    return storage.get(this._path.input([unicode, this._panPosition].join(".")));
  }
}