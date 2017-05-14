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
          initialHoveredElement: "*",
          hoveredElement: [],
          keyboardKeyDown: false,
          keyboardKey: [],
          mousemove: true,
          mousedown: false,
          mouseup: true,
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
          mouseup: "*",
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
          mouseup: true,
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
          mouseup: true,
          handler: _this.setActiveTool.bind(_this, "penTool"),
          cursor: "pen"
        },
        {
          selectedTool: "panTool",
          selectedElement: null,
          initialHoveredElement: "*",
          hoveredElement: [],
          keyboardKeyDown: false,
          keyboardKey: [],
          mousemove: true,
          mousedown: false,
          mouseup: true,
          handler: () => {
          },
          cursor: "pointer"
        },
        {
          selectedTool: "panTool",
          selectedElement: null,
          initialHoveredElement: "*",
          hoveredElement: [],
          keyboardKeyDown: false,
          keyboardKey: [],
          mousemove: false,
          mousedown: true,
          mouseup: false,
          handler: panTool.addPathSegment,
          cursor: "pointer"
        },
        {
          selectedTool: "panTool",
          selectedElement: null,
          initialHoveredElement: "*",
          hoveredElement: [],
          keyboardKeyDown: false,
          keyboardKey: [],
          mousemove: true,
          mousedown: true,
          mouseup: false,
          handler: panTool.handleMouseMove,
          cursor: "pointer"
        },
        // Allow panning on canvas guides
        {
          selectedTool: "panTool",
          selectedElement: null,
          initialHoveredElement: "*",
          hoveredElement: ["CanvasGuide"],
          keyboardKeyDown: false,
          keyboardKey: [],
          mousemove: true,
          mousedown: true,
          mouseup: false,
          handler: panTool.handleMouseMove,
          cursor: "pointer"
        },
        {
          selectedTool: "panTool",
          selectedElement: null,
          initialHoveredElement: "*",
          hoveredElement: ["CanvasGuide"],
          keyboardKeyDown: false,
          keyboardKey: [],
          mousemove: false,
          mousedown: true,
          mouseup: false,
          handler: panTool.addPathSegment,
          cursor: "pointer"
        },
        {
          selectedTool: "panTool",
          selectedElement: null,
          initialHoveredElement: "*",
          hoveredElement: [],
          keyboardKeyDown: false,
          keyboardKey: [],
          mousemove: false,
          mousedown: false,
          mouseup: true,
          handler: panTool.handleMouseUp,
          cursor: "pointer"
        },
        {
          selectedTool: "penTool",
          selectedElement: null,
          initialHoveredElement: "*",
          hoveredElement: [],
          keyboardKeyDown: false,
          keyboardKey: [],
          mousemove: true,
          mousedown: false,
          mouseup: true,
          handler: () => {
          },
          cursor: "pen"
        },
        {
          // Prevent segment collision
          selectedTool: "penTool",
          selectedElement: null,
          initialHoveredElement: "*",
          hoveredElement: ["Segment"],
          keyboardKeyDown: false,
          keyboardKey: [],
          mousemove: false,
          mousedown: true,
          mouseup: false,
          handler: pEnTool.exclusiveSelectSegment,
          cursor: "penSquare"
        },
        {
          // Prevent segment collision
          selectedTool: "penTool",
          selectedElement: null,
          initialHoveredElement: "*",
          hoveredElement: ["FirstPathSegment"],
          keyboardKeyDown: false,
          keyboardKey: [],
          mousemove: false,
          mousedown: true,
          mouseup: false,
          handler: pEnTool.exclusiveSelectSegment,
          cursor: "penSquare"
        },
        {
          selectedTool: "penTool",
          selectedElement: null,
          initialHoveredElement: "*",
          hoveredElement: "*",
          keyboardKeyDown: "*",
          keyboardKey: "*",
          mousemove: false,
          mousedown: true,
          mouseup: false,
          handler: pEnTool.setMouseDownPoint,
          cursor: "pen"
        },
        {
          selectedTool: "penTool",
          selectedElement: null,
          initialHoveredElement: "*",
          hoveredElement: [],
          keyboardKeyDown: false,
          keyboardKey: [],
          mousemove: false,
          mousedown: true,
          mouseup: false,
          handler: pEnTool.addPathSegment,
          cursor: "penSquare"
        },
        {
          selectedTool: "penTool",
          selectedElement: null,
          initialHoveredElement: ["FirstPathSegment"],
          hoveredElement: "*",
          keyboardKeyDown: false,
          keyboardKey: [],
          mousemove: true,
          mousedown: true,
          mouseup: false,
          handler: pEnTool.setHandles,
          cursor: "penCircle"
        },
        {
          selectedTool: "penTool",
          selectedElement: null,
          initialHoveredElement: ["Segment"],
          hoveredElement: "*",
          keyboardKeyDown: false,
          keyboardKey: [],
          mousemove: true,
          mousedown: true,
          mouseup: false,
          handler: pEnTool.setHandles,
          cursor: "penCircle"
        },
        {
          selectedTool: "penTool",
          selectedElement: null,
          initialHoveredElement: ["FirstPathSegment"],
          hoveredElement: "*",
          keyboardKeyDown: true,
          keyboardKey: ["ControlLeft"],
          mousemove: true,
          mousedown: true,
          mouseup: false,
          handler: pEnTool.moveSegment,
          cursor: "penCircle"
        },
        {
          selectedTool: "penTool",
          selectedElement: null,
          initialHoveredElement: ["Segment"],
          hoveredElement: "*",
          keyboardKeyDown: true,
          keyboardKey: ["ControlLeft"],
          mousemove: true,
          mousedown: true,
          mouseup: false,
          handler: pEnTool.moveSegment,
          cursor: "penCircle"
        },
        {
        // Hovering about a point
        selectedTool: "penTool",
        selectedElement: null,
        initialHoveredElement: "*",
        hoveredElement: ["Segment"],
        keyboardKeyDown: true,
        keyboardKey: ["ControlLeft"],
        mousemove: true,
        mousedown: false,
        mouseup: true,
        handler: () => {},
        cursor: "penSquare"
      },
        {
          // Hovering about a point
          selectedTool: "penTool",
          selectedElement: null,
          initialHoveredElement: [],
          hoveredElement: [],
          keyboardKeyDown: true,
          keyboardKey: ["ControlLeft"],
          mousemove: true,
          mousedown: false,
          mouseup: true,
          handler: () => {},
          cursor: "pen"
        },
        {
          // Hovering about a point
          selectedTool: "penTool",
          selectedElement: null,
          initialHoveredElement: "*",
          hoveredElement: ["FirstPathSegment"],
          keyboardKeyDown: true,
          keyboardKey: ["ControlLeft"],
          mousemove: true,
          mousedown: false,
          mouseup: true,
          handler: () => {},
          cursor: "penCircle"
        },
        {
          // Hovering about a point
          selectedTool: "penTool",
          selectedElement: null,
          initialHoveredElement: [],
          hoveredElement: ["FirstPathSegment"],
          keyboardKeyDown: true,
          keyboardKey: ["ControlLeft"],
          mousemove: true,
          mousedown: false,
          mouseup: true,
          handler: () => {},
          cursor: "pen"
        },
        {
          selectedTool: "penTool",
          selectedElement: null,
          initialHoveredElement: ["FirstPathSegment"],
          hoveredElement: ["FirstPathSegment"],
          keyboardKeyDown: false,
          keyboardKey: [],
          mousemove: false,
          mousedown: true,
          mouseup: false,
          handler: pEnTool.closePath,
          cursor: "penCircle"
        },
        {
          // Revert cursorMinus
          selectedTool: "penTool",
          selectedElement: null,
          initialHoveredElement: [],
          hoveredElement: [],
          keyboardKeyDown: true,
          keyboardKey: ["AltLeft"],
          mousemove: true,
          mousedown: false,
          mouseup: true,
          handler: () => {},
          cursor: "pen"
        },
        {
          // Revert cursorMinus
          selectedTool: "penTool",
          selectedElement: null,
          initialHoveredElement: [],
          hoveredElement: [],
          keyboardKeyDown: true,
          keyboardKey: ["AltLeft"],
          mousemove: true,
          mousedown: false,
          mouseup: true,
          handler: () => {},
          cursor: "pen"
        },
        {
          selectedTool: "penTool",
          selectedElement: null,
          initialHoveredElement: "*",
          hoveredElement: ["Segment"],
          keyboardKeyDown: true,
          keyboardKey: ["AltLeft"],
          mousemove: true,
          mousedown: false,
          mouseup: true,
          handler: () => {},
          cursor: "penMinus"
        },
        {
          selectedTool: "penTool",
          selectedElement: null,
          initialHoveredElement: "*",
          hoveredElement: ["FirstPathSegment"],
          keyboardKeyDown: true,
          keyboardKey: ["AltLeft"],
          mousemove: true,
          mousedown: false,
          mouseup: true,
          handler: () => {},
          cursor: "penMinus"
        },
        {
          selectedTool: "penTool",
          selectedElement: null,
          initialHoveredElement: ["Segment"],
          hoveredElement: ["Segment"],
          keyboardKeyDown: true,
          keyboardKey: ["AltLeft"],
          mousemove: false,
          mousedown: true,
          mouseup: false,
          handler: pEnTool.removeSegment,
          cursor: "pen"
        },
        {
          selectedTool: "penTool",
          selectedElement: null,
          initialHoveredElement: ["FirstPathSegment"],
          hoveredElement: ["FirstPathSegment"],
          keyboardKeyDown: true,
          keyboardKey: ["AltLeft"],
          mousemove: false,
          mousedown: true,
          mouseup: false,
          handler: pEnTool.removePath,
          cursor: "pen"
        },
        {
          // Set cursor for when 1. released key 2. released mouse
          selectedTool: "penTool",
          selectedElement: null,
          initialHoveredElement: "*",
          hoveredElement: "*",
          keyboardKeyDown: false,
          keyboardKey: [],
          mousemove: false,
          mousedown: false,
          mouseup: true,
          handler: () => {},
          cursor: "pen"
        },
        {
          // Set cursor for when 1. released mouse 2. moved mouse 3. released key
          selectedTool: "penTool",
          selectedElement: null,
          initialHoveredElement: "*",
          hoveredElement: "*",
          keyboardKeyDown: false,
          keyboardKey: [],
          mousemove: true,
          mousedown: false,
          mouseup: true,
          handler: () => {},
          cursor: "pen"
        },
        {
          // Hovering about a point
          selectedTool: "penTool",
          selectedElement: null,
          initialHoveredElement: "*",
          hoveredElement: ["FirstPathSegment"],
          keyboardKeyDown: false,
          keyboardKey: [],
          mousemove: true,
          mousedown: false,
          mouseup: true,
          handler: () => {},
          cursor: "penCircle"
        },
        {
          // Hovering about a point
          selectedTool: "penTool",
          selectedElement: null,
          initialHoveredElement: "*",
          hoveredElement: ["Segment"],
          keyboardKeyDown: false,
          keyboardKey: [],
          mousemove: true,
          mousedown: false,
          mouseup: true,
          handler: () => {},
          cursor: "penSquare"
        },
        {
          // Set cursor when 1. released mouse 2. released key
          selectedTool: "penTool",
          selectedElement: null,
          initialHoveredElement: "*",
          hoveredElement: "*",
          keyboardKeyDown: false,
          keyboardKey: [],
          mousemove: false,
          mousedown: true,
          mouseup: false,
          handler: () => {},
          cursor: "pen"
        },
        {
          // Set cursor
          selectedTool: "penTool",
          selectedElement: null,
          initialHoveredElement: ["Path"],
          hoveredElement: "*",
          keyboardKeyDown: true,
          keyboardKey: ["ControlLeft"],
          mousemove: false,
          mousedown: true,
          mouseup: false,
          handler: () => {},
          cursor: "pointer"
        },
        {
          selectedTool: "penTool",
          selectedElement: null,
          initialHoveredElement: ["Path"],
          hoveredElement: "*",
          keyboardKeyDown: true,
          keyboardKey: ["ControlLeft"],
          mousemove: true,
          mousedown: false,
          mouseup: true,
          handler: () => {},
          cursor: "pointer"
        },
        {
          selectedTool: "penTool",
          selectedElement: null,
          initialHoveredElement: ["Path"],
          hoveredElement: "*",
          keyboardKeyDown: true,
          keyboardKey: ["ControlLeft"],
          mousemove: true,
          mousedown: true,
          mouseup: false,
          handler: pEnTool.movePath,
          cursor: "pointer"
        },
        {
          // Revert pointer cursor
          selectedTool: "penTool",
          selectedElement: null,
          initialHoveredElement: ["Path"],
          hoveredElement: ["Path"],
          keyboardKeyDown: false,
          keyboardKey: [],
          mousemove: true,
          mousedown: false,
          mouseup: true,
          handler: () => {},
          cursor: "pen"
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