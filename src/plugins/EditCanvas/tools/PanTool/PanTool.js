import CanvasEventUnit from "../../support/canvasEventStream/CanvasEventUnit";
import PanToolStorage from "./PanToolStorage";
import ToolInterface from "./../../support/ToolInterface";

export default class PanTool extends ToolInterface {

  _tool;
  _canvas;
  _paper;
  _storage;
  _unicode;

  _viewStart = null;

  /**
   *
   * @param {string} unicode
   * @param {PaperScope} paper
   * @param {HTMLCanvasElement} canvas
   */
  constructor(unicode, paper, canvas) {
    super();

    let _this = this;
    this._tool = new paper.Tool();
    this._paper = paper;
    this._canvas = canvas;
    this._storage = new PanToolStorage(unicode, canvas);
    this._unicode = unicode;

    this._tool.onMouseDown = (e) => {
      this._viewStart = this._paper.view.center;
      this._mouseStart = new this._paper.paper.Point(e.event.offsetX, e.event.offsetY);
    };

    /**
     * Setup functionality after activation
     */
    this._tool.onMouseDrag = (event) => {
      let x, y, nativeDelta = new this._paper.Point(
        x = event.event.offsetX - _this._mouseStart.x,
        y = event.event.offsetY - _this._mouseStart.y
      );

      // Move into view coordinates to subtract delta, then back into project coords.
      this._paper.view.center = this._paper.view.viewToProject(
        this._paper.view.projectToView(this._viewStart).subtract(nativeDelta)
      );
    };

    this._tool.onMouseUp = (event) => {
      let _this = this;
      this._storage.setGlyphPanPosition(this._unicode, {x: _this._paper.view.center.x, y: _this._paper.view.center.y});
      this._mouseStart = null;
      this._viewStart = null;
    }
  }

  activate() {
    // ready for the user to use
    this._observer.emit("ready");
    this._tool.activate();
  }

  tool() {

  }

  set unicode(unicode) {
    this._currentGlyphUnicode = unicode;
    let glyphPanPosition = this._storage.getGlyphPanPosition(unicode);
    this._paper.view.center = new this._paper.Point(glyphPanPosition.x, glyphPanPosition.y);
  }

  pan() {
    this.unicode = this._unicode;
  }
}

