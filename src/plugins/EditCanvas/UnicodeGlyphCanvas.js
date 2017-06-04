import CanvasGuideLayer from "./reactives/CanvasGuide/CanvasGuideLayer";
import PanTool from "./tools/PanTool/PanTool";
import CanvasInterface from "./support/CanvasInterface";
import CanvasEventUnit from "./support/canvasEventStream/CanvasEventUnit";
import {storage} from "./../../lib/storage/Storage";
import {ToolDispatcher} from "./ToolDispatcher";
import PEnTool from "./tools/PenTool/PEnTool";
import {config} from "./../../config/config";

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

    this._paper.settings.handleSize = config.handleSize;

    this.resize(window.innerWidth - 400, window.innerHeight - 140);
    this._canvasGuideLayer = new CanvasGuideLayer(paper, canvas, unicode);
    this._canvasGuideLayer.drawCanvasGrid();
    this._observer = new CanvasEventUnit("glyphCanvas", 3);

    let windowResizeHandler = () => {
      this.resize(Math.round(window.innerWidth - 400), Math.round(window.innerHeight - 140));
    };

    window.addEventListener("resize", windowResizeHandler);

    // Dirty trick to demo project creation, will get deprecated when PenTool will get converted to current infra.
    let saveHandler = () => {
      this.save();
    };

    let panTool = new PanTool(unicode, paper, canvas);
    let pEnTool = new PEnTool(unicode, paper, canvas);

    panTool.pan();

    // Clean up
    this.onDestroy(() => {
      window.removeEventListener("resize", windowResizeHandler);
      this.save();
      this._paper.project.remove();
      this._observer.off(saveHandler);
      this._observer.destroy();
      ToolDispatcher.destroy();
    });

    ToolDispatcher.dispatchRegister =
      [
        // Activate default tool
        {
          selectedTool: null,
          selectedElement: null,
          initialHoveredElement: null,
          hoveredElement: null,
          keyboardKeyDown: false,
          keyboardKey: [],
          mousemove: true,
          mousedown: false,
          handler: _this.setActiveTool.bind(_this, config.defaultGlyphCanvasTool),
          cursor: "pointer"
        },
        {
          selectedTool: "*",
          selectedElement: "*",
          initialHoveredElement: "*",
          hoveredElement: "*",
          keyboardKeyDown: "*",
          keyboardKey: ["F5"],
          mousemove: "*",
          mousedown: "*",
          handler: _this.refreshPage,
          cursor: "pointer"
        },
        // Activate pan tool keyshortcut
        {
          selectedTool: "*",
          selectedElement: "*",
          initialHoveredElement: "*",
          hoveredElement: "*",
          keyboardKeyDown: true,
          keyboardKey: ["KeyT"],
          mousemove: "*",
          mousedown: false,
          handler: _this.setActiveTool.bind(_this, "panTool"),
          cursor: "pointer"
        },
        // Activate pen tool keyshortcut
        {
          selectedTool: "*",
          selectedElement: "*",
          initialHoveredElement: "*",
          hoveredElement: "*",
          keyboardKeyDown: true,
          keyboardKey: ["KeyP"],
          mousemove: "*",
          mousedown: false,
          handler: _this.setActiveTool.bind(_this, "penTool"),
          cursor: "pen"
        },
        {
          selectedTool: "panTool",
          selectedElement: null,
          initialHoveredElement: "*",
          hoveredElement: null,
          keyboardKeyDown: false,
          keyboardKey: [],
          mousemove: true,
          mousedown: false,
          handler: () => {
          },
          cursor: "pointer"
        },
        {
          selectedTool: "panTool",
          selectedElement: null,
          initialHoveredElement: "*",
          hoveredElement: "*",
          keyboardKeyDown: false,
          keyboardKey: [],
          mousemove: false,
          mousedown: true,
          handler: panTool.setMouseDownPoint,
          cursor: "crosshair"
        },
        {
          // Pan idependently of what is hovered
          selectedTool: "panTool",
          selectedElement: null,
          initialHoveredElement: "*",
          hoveredElement: "*",
          keyboardKeyDown: false,
          keyboardKey: [],
          mousemove: true,
          mousedown: true,
          handler: panTool.handleMouseMove,
          cursor: "pointer"
        },
        {
          selectedTool: "panTool",
          selectedElement: null,
          initialHoveredElement: "*",
          hoveredElement: null,
          keyboardKeyDown: false,
          keyboardKey: [],
          mousemove: false,
          mousedown: false,
          handler: panTool.handleMouseUp,
          cursor: "pointer"
        },
        {
          selectedTool: "penTool",
          selectedElement: null,
          initialHoveredElement: null,
          hoveredElement: null,
          keyboardKeyDown: false,
          keyboardKey: [],
          mousemove: false,
          mousedown: true,
          handler: pEnTool.addSegment,
          cursor: "penSquare"
        },
        {
          selectedTool: "penTool",
          selectedElement: null,
          initialHoveredElement: "segment",
          hoveredElement: "*",
          keyboardKeyDown: false,
          keyboardKey: [],
          mousemove: false,
          mousedown: true,
          handler: pEnTool.selectSegment,
          cursor: "penSquare"
        },
        {
          selectedTool: "penTool",
          selectedElement: null,
          initialHoveredElement: "segment",
          hoveredElement: "*",
          keyboardKeyDown: false,
          keyboardKey: [],
          mousemove: true,
          mousedown: true,
          handler: pEnTool.moveSegment,
          cursor: "penSquare"
        },
        {
          selectedTool: "penTool",
          selectedElement: null,
          initialHoveredElement: "segment",
          hoveredElement: "?grid-guide ?segment horizontal-canvas-guide",
          keyboardKeyDown: false,
          keyboardKey: [],
          mousemove: true,
          mousedown: true,
          handler: pEnTool.snapToHorizontalGuide,
          cursor: "penSquare"
        },
        {
          selectedTool: "penTool",
          selectedElement: null,
          initialHoveredElement: "segment",
          hoveredElement: "?grid-guide ?segment vertical-canvas-guide",
          keyboardKeyDown: false,
          keyboardKey: [],
          mousemove: true,
          mousedown: true,
          handler: pEnTool.snapToVerticalGuide,
          cursor: "penSquare"
        },
        {
          selectedTool: "penTool",
          selectedElement: null,
          initialHoveredElement: null,
          hoveredElement: "?grid-guide ?horizontal-canvas-guide ?vertical-canvas-guide",
          keyboardKeyDown: false,
          keyboardKey: [],
          mousemove: true,
          mousedown: false,
          handler: () => {},
          cursor: "pen"
        },
        {
          selectedTool: "penTool",
          selectedElement: null,
          initialHoveredElement: null,
          hoveredElement: "segment",
          keyboardKeyDown: false,
          keyboardKey: [],
          mousemove: true,
          mousedown: false,
          handler: () => {},
          cursor: "penSquare"
        },
        {
          selectedTool: "penTool",
          selectedElement: null,
          initialHoveredElement: null,
          hoveredElement: "*",
          keyboardKeyDown: true,
          keyboardKey: ["AltLeft"],
          mousemove: true,
          mousedown: false,
          handler: () => {},
          cursor: "penMinus"
        },
        {
          selectedTool: "penTool",
          selectedElement: null,
          initialHoveredElement: "segment",
          hoveredElement: "*",
          keyboardKeyDown: true,
          keyboardKey: ["AltLeft"],
          mousemove: false,
          mousedown: true,
          handler: pEnTool.removeSegment,
          cursor: "penMinus"
        }
      ];

    ToolDispatcher.canvas = canvas;
  }

  refreshPage() {
    window.location.reload();
  }

  /**
   *  Set the active tool
   * @param {string} tool
   */
  setActiveTool(tool) {
    ToolDispatcher.selectedTool = tool;
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
    if (this.getLatestSave() !== null) {
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