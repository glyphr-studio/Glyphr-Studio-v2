import CanvasGuideLayer from "./reactives/CanvasGuide/CanvasGuideLayer";
import PanTool from "./tools/PanTool/PanTool";
import CanvasInterface from "./support/CanvasInterface";
import CanvasEventUnit from "./support/canvasEventStream/CanvasEventUnit";
import {storage} from "./../../lib/storage/Storage";
import CanvasCursor from "./support/CanvasCursor";
import {ToolDispatcher} from "./ToolDispatcher";

export default class GlyphCanvas extends CanvasInterface {

  _paper = null;
  _canvas = null;
  _toolDispatcher = null;
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
    this._canvasGuideLayer = new CanvasGuideLayer(paper, canvas, unicode);
    this._canvasGuideLayer.drawCanvasGrid();
    this._observer = new CanvasEventUnit("glyphCanvas", 3);
    this._cursor = new CanvasCursor(canvas);

    let windowResizeHandler = () => {
      this.resize(Math.round(window.innerWidth-400), Math.round(window.innerHeight-140));
    };

    window.addEventListener("resize", windowResizeHandler);

    // Dirty trick to demo project creation, will get deprecated when PenTool will get converted to current infra.
    let saveHandler = () => {
      this.save();
    };

    let panTool = new PanTool(unicode, paper, canvas);

    // Clean up
    this.onDestroy(() => {
      window.removeEventListener("resize", windowResizeHandler);
      this.save();
      this._paper.project.remove();
      this._observer.off(saveHandler);
      this._observer.destroy();
    });


    let toolDispatchRegister = [
      {
        selectedTool: null,
        selectedElement: null,
        hoveredElement: null,
        keyboardKeyDown: null,
        keyboardKeyUp: null,
        mousemove: false,
        mousedown: false,
        mouseup: true,
        handler: () => {
          console.info("default handler fired");
        }
      },
      {
        selectedTool: "panTool",
        selectedElement: null,
        hoveredElement: null,
        keyboardKeyDown: null,
        keyboardKeyUp: null,
        mousemove: false,
        mousedown: true,
        mouseup: false,
        handler: panTool.handleMouseDown
      },
      {
        selectedTool: "panTool",
        selectedElement: null,
        hoveredElement: null,
        keyboardKeyDown: null,
        keyboardKeyUp: null,
        mousemove: true,
        mousedown: true,
        mouseup: false,
        handler: panTool.handleMouseMove
      },
      {
        selectedTool: "panTool",
        selectedElement: null,
        hoveredElement: null,
        keyboardKeyDown: null,
        keyboardKeyUp: null,
        mousemove: false,
        mousedown: false,
        mouseup: true,
        handler: panTool.handleMouseUp
      }
    ];

    ToolDispatcher.dispatchRegister = toolDispatchRegister;
    ToolDispatcher.dispatch();
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