import ReactiveInterface from "../../support/ReactiveInterface";

export default class CanvasGuideReactive extends ReactiveInterface {
  _canvas = null;
  _guide = null;

  /**
   *
   * @param {PaperScope} paper
   * @param {HTMLCanvasElement} canvas
   * @param {CanvasGuide} guide
   */
  constructor(paper, canvas, guide) {
    super(canvas, guide.tresholdRectangle);
    this._paper = paper;
    this._guide = guide;
    this._canvas = canvas;
  }


}