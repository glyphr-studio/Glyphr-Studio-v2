import CanvasGuideLayer from "./CanvasGuideLayer";
import PanTool from "./tools/PanTool/PanTool";

export default class GlyphCanvas {

  _paper;
  _canvas;
  _panTool;
  _unicode;
  _canvasGuideLayer;

  _onDestroy = [];

  constructor(unicode, paper, canvas) {
    this._unicode = unicode;
    this._paper = paper;
    this._canvas = canvas;

    this._paper.setup(this._canvas);
    this.resize(window.innerWidth-400, window.innerHeight-140);

    this._panTool = new PanTool(unicode, paper, canvas);
    this._panTool.activate();

    this._canvasGuideLayer = new CanvasGuideLayer(paper,canvas);

    this._canvasGuideLayer.drawCanvasGrid();
    this._panTool.pan(unicode);

    let windowResizeHandler = () => {
      this.resize(window.innerWidth-400, window.innerHeight-140);
      this._canvasGuideLayer.drawCanvasGrid();
      this._panTool.pan(this._unicode);

      this.onDestroy(() => {
        window.removeEventListener("resize", windowResizeHandler);
      })
    };
    window.addEventListener("resize", windowResizeHandler);
  }


  /**
   *
   * @param {number} width
   * @param {number} height
   */
  resize(width, height) {
    this._canvas.setAttribute("width", width);
    this._canvas.setAttribute("height", height);
  }

  destroy()  {
    this._onDestroy.forEach((callback) => {
      callback();
    })
  }

  /**
   * This event will fire when current instance is about to get destroyed
   * @param {function} callback
   */
  onDestroy(callback) {
    this._onDestroy.push(callback);
  }
}