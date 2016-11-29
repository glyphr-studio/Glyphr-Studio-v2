import * as encoding from "./../encoding/encoding";
import * as hlpr from "../../utils/helpers";
import paper from "../../../bower_components/paper/dist/paper-full.js" 

/**
 *  Represents one Glyph
 *  @constructor
 *  @param {object} oa - optional object argumennt
 *  @param {string} oa.char - the character representation for this Glyph
 *  @param {string} [oa.name = 'DEFAULT NAME'] - Name of this glyph.  Should be set on creation, default should never be encountered.
 *  @param {string} [oa.pathData = false] - SVG style path data (what appears in the 'd' attribute of the <path> tag)
 *  @param {bool} [oa.isAutoWide = true] - Glyph has a dynamic width, depending on the paths it contains
 *  @param {number} [oa.glyphWidth = 0] - Manually set width of the glyph (in em units).  Ignored if Glyph.isAutoWide == true.
 *  @param {number} [oa.leftSideBearing = false] - Width of the Left Side Bearing (in em units). If false, uses default global value.
 *  @param {number} [oa.rightSideBearing = false] - Width of the Right Side Bearing (in em units). If false, uses default global value.
 *  @param {bool} [oa.ratioLock = false] - When adjusting the size of the glyph, maintain the aspect ratio of the whole glyph
 *  @param {array} [oa.children = []] - all the paths that make up this Glyph. These are paper.Path objects, or glyphr.ComponentInstance objects
 *  @param {array} [oa.usedin =[]] - Pointers to all the other glyphs in which this glyph is used as a Component Instance.
 */

export default class Glyph {
  
  _glyph = {
    char: '',
    objtype : 'glyph',
    name : '',
    pathData : false,
    isAutoWide : true,
    glyphWidth : 0,
    leftSideBearing : false,
    rightSideBearing : false,
    ratioLock : false,
    children : [],
    usedin : []
  };

  constructor(oa) {
    hlpr.debug('\n Glyph - START');
    hlpr.debug(oa);
    
    paper.setup();
    oa = oa || {};

    if(typeof oa.char === "string" || typeof oa.char === "number") {
      this._glyph.char = oa.char;
    }

    if(this._glyph.char && this._glyph.char.length && this._glyph.char.length !== 1) throw new TypeError('Glyph: character length must be equal to 1. Given length is: ' + this._glyph.char.length);

    this._glyph.name = oa.name || 'DEFAULT NAME';
    this._glyph.pathData = oa.pathData || false;
    this._glyph.isAutoWide = hlpr.isval(oa.isAutoWide)? oa.isAutoWide : true;
    this._glyph.glyphWidth = hlpr.isval(oa.glyphWidth)? oa.glyphWidth : 0;
    this._glyph.leftSideBearing = hlpr.isval(oa.leftSideBearing)? oa.leftSideBearing : false;
    this._glyph.rightSideBearing = hlpr.isval(oa.rightSideBearing)? oa.rightSideBearing : false;
    this._glyph.ratioLock = hlpr.isval(oa.ratioLock)? oa.ratioLock : false;
    this._glyph.children = oa.children || [];  // paper.Path objects, or glyphr.ComponentInstance objects
    this._glyph.usedin = oa.usedin || [];

    // Hydrate paper.Path and glyphr.ComponentInstance children based on existing json
    var lc = 0;
    var cs = 0;
    if(oa.children && oa.children.length){
      for(var i=0; i<oa.children.length; i++) {
        if(oa.children[i].objtype === 'componentinstance'){
          hlpr.debug('\t hydrating ci ' + oa.children[i].name);
          this._glyph.children[i] = new ComponentInstance(oa.children[i]);
          lc++;
        } else {
          hlpr.debug('\t hydrating sh ' + oa.children[i].name);
          this._glyph.children[i] = new paper.Path(oa.children[i]);
          cs++;
        }
      }
    }

    // Hydrate paper.Path children based on pathData (SVG)
    if(oa.pathData){
      oa.pathData.split('Z').forEach(function(v, i, a){
        if(!v) return;
        else this._glyph.children.push(new paper.Path({pathData: (v+'Z')}));
      }, this);
    }

    hlpr.debug(' Glyph - END\n');
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

  pathData(){
    return this._glyph.pathData;
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