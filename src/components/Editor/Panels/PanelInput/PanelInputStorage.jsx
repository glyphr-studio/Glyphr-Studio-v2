import React from "react"
import storage from "./../../../../lib/storage/Storage";

class PanelTextInputStorage {
  _path = {
    input (x, y) {
        return ['input', x, y].join('.');
      }
  };

  setInput(x, y, value) {
    storage.set(this._path.input(x, y), value);
  }

  getInput(x, y) {
    return storage.get(this._path.input(x, y));
  }
}

export default new PanelTextInputStorage();