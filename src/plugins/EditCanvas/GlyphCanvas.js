import CanvasGuideLayer from "./CanvasGuideLayer";
import PanTool from "./tools/PanTool/PanTool";
import CanvasInterface from "./support/CanvasInterface";
import CanvasEventUnit from "./support/canvasEventStream/CanvasEventUnit";
import {storage} from "./../../lib/storage/Storage";

export default class GlyphCanvas extends CanvasInterface {

  _paper = null;
  _canvas = null;
  _panTool = null;
  _canvasGuideLayer = null;
  _unicode = "";

  /**
   * Data which another GlyphCanvas instance will need to resume editing (on another glyph)
   *
   * @type {object}
   * @private
   */
  _options = {
    activeTool: "panTool"
  };

  /**
   *
   * @param {string}            unicode
   * @param {PaperScope}        paper
   * @param {HTMLCanvasElement} canvas
   * @param {string}            options   Serialized options object
   */
  constructor(unicode, paper, canvas, options, callback) {
    super();

    let _this = this;
    this._unicode = unicode;
    this._paper = paper;
    this._canvas = canvas;

    this._paper.setup(this._canvas);
    this.resize(window.innerWidth-400, window.innerHeight-140);
    this._canvasGuideLayer = new CanvasGuideLayer(paper,canvas);
    this._observer = new CanvasEventUnit("glyphCanvas", 3);

    this._canvasGuideLayer.drawCanvasGrid();

    if(this.resumeProject() === false) {
      alert(`Enjoy your first edits on ${unicode}`)
    }

    this._panTool = new PanTool(unicode, paper, canvas);
    this._panTool.pan(unicode);

    switch(this._options.activeTool) {
      case "panTool":
        this.activatePanTool();
        break;
      default:
        this.activateDefaultTool();
    }

    let windowResizeHandler = () => {
      this.resize(Math.round(window.innerWidth-400), Math.round(window.innerHeight-140));
      // this._canvasGuideLayer.drawCanvasGrid();
      this._panTool.pan(this._unicode);
    };

    window.addEventListener("resize", windowResizeHandler);

    // Dirty trick to demo project creation, will get deprecated when PenTool will get converted to current infra.
    let saveHandler = () => {
      this.save();
    };

    this._observer.on("penTool.save", saveHandler);

    // Clean up
    this.onDestroy(() => {
      this._panTool.tool.remove();
      window.removeEventListener("resize", windowResizeHandler);
      this.save();
      this._paper.project.remove();
      this._observer.off(saveHandler);
      this._observer.destroy();
      this._panTool.destroy();
    });

    this.activateDefaultTool();
  }

  activateDefaultTool() {
    this._panTool.activate();
  }

  activatePanTool() {
    this._panTool.activate();
  }

  /**
   * Get the default tool
   *
   * @return {ToolInterface}
   */
  getDefaultTool() {
    return this._panTool;
  }

  /**
   * Resize canvas to a given width and height
   *
   * @param {number} width
   * @param {number} height
   */
  resize(width, height) {
    this._canvas.setAttribute("width", width);
    this._canvas.setAttribute("height", height);
  }

  /**
   * Save the project to localstorage
   */
  save() {
    this._canvasGuideLayer.destroy();
    storage.set(`glyphCanvas.${this._unicode}.project`, this._paper.project.exportJSON());
    this._canvasGuideLayer.drawCanvasGrid();
  }

  /**
   * Get last save form localstorage
   *
   * @return {string} Project JSON
   */
  getLatestSave() {
    return storage.get(`glyphCanvas.${this._unicode}.project`);
  }

  /**
   *
   * @return {true}   Project has been resumed
   * @return {false}  There was no previous save, the project has not been resumed.
   */
  resumeProject() {
    if(this.getLatestSave() !== null) {
      this._paper.project.importJSON(this.getLatestSave());
      return true;
    }

    return false;
  }

  /**
   * Export project to JSON
   * @return {string}
   */
  exportJSON() {
    return JSON.stringify(this._options);
  }

  /**
   * Import project form JSON
   * @param json
   */
  importJSON(json) {
    this._options = JSON.serialize(json);
  }
}