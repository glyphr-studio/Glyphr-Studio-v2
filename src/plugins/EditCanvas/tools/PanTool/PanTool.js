import CanvasEventUnit from "../../support/canvasEventStream/CanvasEventUnit";
import PanToolStorage from "./PanToolStorage";
import ToolInterface from "./../../support/ToolInterface";


export default class PanTool extends ToolInterface {

  _tool;
  _canvas;
  _paper;
  // overwriting the inherited _storage
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
    super(canvas);

    let _this = this;
    this._tool = new paper.Tool();
    this._tool._gsWrapper = this;

    this._paper = paper;
    this._canvas = canvas;
    this._storage = new PanToolStorage(unicode, canvas);
    this._unicode = unicode;

    this.handleMouseUp = () => {
      let _this = this;
      this._storage.setGlyphPanPosition(this._unicode, {x: _this._paper.view.center.x, y: _this._paper.view.center.y});
      this._mouseStart = null;
      this._viewStart = null;
    };

    this.handleMouseDown = (toolEvent) => {
      this._viewStart = this._paper.view.center;
      this._mouseStart = new this._paper.paper.Point(toolEvent.event.offsetX, toolEvent.event.offsetY);
    };

    this.handleMouseMove = (toolEvent) => {
      // teporary fix: when panning on guides this._mouseStart is null
      if (!this._mouseStart) return;

      let x, y, nativeDelta = new this._paper.Point(
        x = toolEvent.event.offsetX - this._mouseStart.x,
        y = toolEvent.event.offsetY - this._mouseStart.y
      );

      // Move into view coordinates to subtract delta, then back into project coords.
      this._paper.view.center = this._paper.view.viewToProject(
        this._paper.view.projectToView(this._viewStart).subtract(nativeDelta)
      );
    }
  }

  activate() {
    // ready for the user to use
    this.setCursor("pointer");
    this._observer.emit("ready");
    this._tool.activate();
  }

  /**
   * Get the tool
   * @return {PaperJS.Tool}
   */
  get tool() {
    return this._tool;
  }

  set unicode(unicode) {
    this._currentGlyphUnicode = unicode;
    let glyphPanPosition = this._storage.getGlyphPanPosition(unicode);
    this._paper.view.center = new this._paper.Point(glyphPanPosition.x, glyphPanPosition.y);
  }

  pan() {
    this.unicode = this._unicode;
  }

  destroy() {
    this._observer.destroy();
  }
}

