import {storage} from "./../../../../lib/storage/Storage";
import Destroyable from "./../../support/Destroyable";
import CanvasGuideReactive from "./CanvasGuideReactive";
import {ToolDispatcher} from "./../../ToolDispatcher";

export default class CanvasGuide extends Destroyable {
  _guide;
  _tresholdRectangle;
  _isVertical = true;
  _unicode = null;
  _treshold = 8;
  _reactive = null;

  /**
   *
   * @param {PaperScope} paper
   * @param {string} unicode
   * @param {Point} from
   * @param {Point} to
   * @param {boolean} isVertical
   * @param {string} colorHex
   * @param {Number} treshold
   */
  constructor(paper, unicode, from, to, isVertical=true, colorHex, treshold=8) {
    super();

    this._isVertical = isVertical;
    this._unicode = unicode;
    this._treshold = treshold;
    this._paper = paper;

    let $ = paper;

    this._guide = new $.Path.Line(from, to);
    this._guide.strokeColor = colorHex;

    if(isVertical === true) {
      from = from.add(new $.Point(-this._treshold,0));
      to = to.add(new $.Point(this._treshold, 0));

      this._tresholdRectangle = new $.Path.Rectangle(from, to);
    } else {
      from = from.add(new $.Point(0,-this._treshold));
      to = to.add(new $.Point(0, this._treshold));

      this._tresholdRectangle = new $.Path.Rectangle(from, to);
    }

    this._tresholdRectangle.fillColor = new $.Color(0, 0, 0, 0);

    this._reactive = new CanvasGuideReactive(paper.view.element, this._tresholdRectangle);


    this.onDestroy(() => {
      // this._guide.remove();
      // this._tresholdRectangle.remove();
    });

    this._reactive.onHover(() => {
      // When clicking on
      if(ToolDispatcher.hoveredElementExistsInRegister(this) === false) {
        let hook = ToolDispatcher.pushHoveredElement("CanvasGuide", this);
        this._reactive.onBlur(() => {
          ToolDispatcher.removeHoveredElement(hook);
        })
      }
    })
  }

  activate() {
    this._reactive.activate();
  }

  disableReactiveness() {
    this._reactive.destroy();
  }

  get isVertical() {
    return this._isVertical;
  }

  /**
   *
   * @param {Point} delta
   */
  translate(delta) {
    let toolTemp;
    let placeholderTool;
    if(this._paper.tool) {
      toolTemp = this._paper.tool;
      toolTemp.remove();
    }
    let $ = this._paper;
    if (this._isVertical === true) {
      this._guide.translate(new $.Point(delta.x, 0));
      this._tresholdRectangle.translate(new $.Point(delta.x, 0));
    } else {
      this._guide.translate(new $.Point(0, delta.y));
      this._tresholdRectangle.translate(new $.Point(0, delta.y));
    }
    if(toolTemp) {
      this._paper.tools.push(toolTemp);
      toolTemp.activate();
    }
  }

  get tresholdRectangle() {
    return this._tresholdRectangle;
  }
}