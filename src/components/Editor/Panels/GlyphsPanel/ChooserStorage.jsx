import storage from "./../../../../lib/storage/Storage";
import {Glyph} from "./../../../../lib/glyph/Glyph";

// Chooser's dedicated storage

class ChooserStorage {
  _path = {
    latestGlyph: 'chooser.history.latestGlyph'
  };

  set(glyph: Glyph): void {
    storage.set(this._path.latestGlyph, glyph.getSkeleton());
  }

  getLatestGlyph(): Glyph {
    var latest = storage.get(this._path.latestGlyph);
    return latest ? new Glyph(latest) : null;
  }

  hasLatestGlyph(): boolean {
    return storage.native().get(this._path.latestGlyph) !== null;
  }
}

export default new ChooserStorage();