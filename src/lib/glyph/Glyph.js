import * as encoding from "./../encoding/encoding";

export class Glyph {
  _glyph = {
    char: '',
    unicode: '',
    objtype : 'glyph',
    name : '',
    pathData : false,
    isautowide : true,
    glyphwidth : 0,
    leftsidebearing : false,
    rightsidebearing : false,
    ratiolock : false,
    children : [],  // paper.Path objects, or glyphr.ComponentInstance objects
    usedin : []
  };

  constructor(oa) {
    // debug('\n Glyph - START');
    oa = oa || {};


    if(typeof oa.char === "string" || typeof oa.char === "number") {
      this._glyph.char = oa.char;
    }

    if(this._glyph.char && this._glyph.char.length && this._glyph.char.length !== 1) throw new TypeError('Glyph: character length must be equal to 1. Given length is: ' + this._glyph.char.length);

    this.name = oa.name || 'DEFAULT NAME';
    this.pathData = oa.pathData || false;
    this.isautowide = isval(oa.isautowide)? oa.isautowide : true;
    this.glyphwidth = isval(oa.glyphwidth)? oa.glyphwidth : 0;
    this.leftsidebearing = isval(oa.leftsidebearing)? oa.leftsidebearing : false;
    this.rightsidebearing = isval(oa.rightsidebearing)? oa.rightsidebearing : false;
    this.ratiolock = isval(oa.ratiolock)? oa.ratiolock : false;
    this.children = oa.children || [];  // paper.Path objects, or glyphr.ComponentInstance objects
    this.usedin = oa.usedin || [];


    // Hydrate paper.Path and glyphr.ComponentInstance children based on existing json
    var lc = 0;
    var cs = 0;
    if(oa.children && oa.children.length){
      for(var i=0; i<oa.children.length; i++) {
        if(oa.children[i].objtype === 'componentinstance'){
          // debug('\t hydrating ci ' + oa.children[i].name);
          this.children[i] = new ComponentInstance(oa.children[i]);
          lc++;
        } else {
          // debug('\t hydrating sh ' + oa.children[i].name);
          this.children[i] = new paper.Path(oa.children[i]);
          cs++;
        }
      }
    }

    // Hydrate paper.Path children based on pathData (SVG)
    if(oa.pathData){
      oa.pathData.split('Z').forEach(function(v, i, a){
        if(!v) return;
        this.children.push(new paper.Path({pathData: (v+'Z')}));
      });
    }

    // debug(' Glyph - END\n');
  }

  char(): string {
    return this._glyph.char;
  }

  name(): string {
    // todo: implement dynamic character name resolution http://unicode.org/Public/UNIDATA/Index.txt
    // for performance reasons we won't do it in the constructor
    return this._glyph.charName || "(to implement) " + this.char();
  }

  hex() {
    return encoding.toHex(this.char());
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