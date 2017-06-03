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

  _lastCoordinatesText = null;

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

    this.setMouseDownPoint = (toolEvent) => {
      // temporary fix: preventing an error to occur is some instances, which would crash the app
      if (!toolEvent || !toolEvent.event.offsetX) {
        console.warn("PenTool: skipping mousedown to prevent app error")
        return;
      }

      this._viewStart = this._paper.view.center;
      this._mouseStart = new this._paper.paper.Point(toolEvent.event.offsetX, toolEvent.event.offsetY);
    };

    this.drawCoordinates = (event) => {
      if(! event || ! event.point) return;

      if(this._lastCoordinatesText !== null) {
        this._lastCoordinatesText.remove();
      }

      if(typeof event.selectedTool === "undefined") {
        this._lastCoordinatesText = new paper.PointText({
          point: [event.point.x, event.point.y+60],
          content: `(${Math.round(event.point.x)}, ${Math.round(event.point.y)})`
        });
      }
    };

    this.removeCoordinatesText = (event) => {
      if(event && event.selectedTool) {
        this._lastCoordinatesText.remove();
      }
    };

    this.handleMouseMove = (toolEvent) => {
      // teporary fix: when panning on guides this._mouseStart is null

      if (!this._mouseStart || !this._viewStart || !toolEvent || !toolEvent.event.offsetX) {
        console.warn("PanTool: skipping mousemove to prevent app error")
        return;
      }

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

