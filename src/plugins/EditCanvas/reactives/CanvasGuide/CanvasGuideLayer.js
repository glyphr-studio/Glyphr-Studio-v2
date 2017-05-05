import CanvasGuide from "./CanvasGuide";
import Destroyable from "./../../support/Destroyable";

export default class CanvasGuideLayer extends Destroyable {

  _paper;
  _canvas;
  _grid;
  _guides = [];
  _verticalPrimaryGuide;
  _horizontalPrimaryGuide;

  constructor(paper, canvas, unicode) {
    super();
    this._paper = paper;
    this._canvas = canvas;
    this._unicode = unicode;
  }

  drawCanvasGrid(viewCenter) {
    let activeTemp = this._paper.project.activeLayer;
    let $ = this._paper;

    let gridLayer = new paper.Layer();
    gridLayer.name = "grid";

    let guidesLayer = new paper.Layer();
    guidesLayer.name = "guides";

    this.onDestroy(() => {
      gridLayer.remove();
      guidesLayer.remove();
    });

    gridLayer.activate();

    let drawLine = (pos, horizontal, color) => {
      let to, from, path;

      if (horizontal) {
        from = new $.Point(pos, 3000);
        to = new $.Point(pos, -3000);
      } else {
        from = new $.Point(3000, pos * -1);
        to = new $.Point(-3000, pos * -1);
      }

      path = new $.Path.Line(from, to);
      path.strokeColor = color;
    };


    // Grid lines
    let chunk = 100;
    for (let i = chunk; i <= chunk * 10; i += chunk) {
      drawLine(i, true, '#eeeeee');
      drawLine(i, false, '#eeeeee');
    }


    // Primary lines
    this._verticalPrimaryGuide = new CanvasGuide($, this._unicode, new $.Point(0, 3000), new $.Point(0, -3000), true, '#993300');
    this._horizontalPrimaryGuide = new CanvasGuide($, this._unicode, new $.Point(3000, 0), new $.Point(-3000, 0), false, '#ff9900');

    this._horizontalPrimaryGuide.activate();
    this._verticalPrimaryGuide.activate();

    this.onDestroy(() => {
      this._verticalPrimaryGuide.destroy();
      this._horizontalPrimaryGuide.destroy();
    });

    gridLayer.sendToBack();
    guidesLayer.activate();
    guidesLayer.sendToBack();

    activeTemp.activate();
    this._paper.view.draw();
  }

  /**
   *
   * @param {Point} from
   * @param {Point} to
   * @param {boolean} isVertical
   * @param {string} color
   */
  addGuide(from, to, isVertical, color) {
    let guide = new CanvasGuide(this._paper, this._unicode, from, to, isVertical, color);
    this._guides.push(guide);
    return guide;
  }

  /**
   *
   * @param {CanvasGuide} guide
   */
  removeGuide(guide) {
    this._guides.splice(this._guides.indexOf(guide)-1, 1);
  }

  disableVerticalGuideReactive() {
    this._verticalPrimaryGuide.disableReactiveness();
  }

  disableHorizontalGuideReactive() {
    this._horizontalPrimaryGuide.disableReactiveness();
  }
};
