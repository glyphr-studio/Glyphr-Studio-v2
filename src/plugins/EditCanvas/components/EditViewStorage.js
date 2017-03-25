import {storage} from "../../../lib/storage/Storage";
import {config} from "../../../config/config";

export default class EditViewStorage {
  _currentGlyphPath = "currentGlyph";

  constructor() {
    if(this.getCurrentGlyphUnicode() === null) {
      this.setCurrentGlyphUnicode(config.defaultGlyph)
    }
  }

  _path = {
    input (x) {
      return ['editCanvas', x].join('.').replace(/[ -]/g, '_');
    }
  };

  setCurrentGlyphUnicode(unicode) {
    storage.set(this._path.input(this._currentGlyphPath), unicode);
  }

  getCurrentGlyphUnicode() {
    return storage.get(this._path.input(this._currentGlyphPath));
  }
}