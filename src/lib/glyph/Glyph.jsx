export class Glyph {
  _glyph = {
    char: '',
    unicode: ''
  };

  constructor(char) {
    if(char && char.length && char.length !== 1) throw new TypeError('Glyph: character length must be equal to 1. Given length is: ' + char.length);

    if(typeof char === "string" || typeof char === "number") {
      this._glyph.char = char;
    } else {
      this._glyph = char;
    }
  }

  char(): string {
    return this._glyph.char;
  }

  name(): string {
    // todo: implement dynamic character name resolution http://unicode.org/Public/UNIDATA/Index.txt
    // for performance reasons we won't do it in the constructor
    return this._glyph.charName || "(to implement) " + this.char();
  }

  unicode() {
    return this._glyph.unicode;
  }

  getSkeleton() {
    var charName = this._glyph.charName;
    if(typeof charName === "undefined") this._glyph.charName = this.name();

    return this._glyph;
  }

  serialize(): string {
    return JSON.stringify(this._glyph);
  }
}