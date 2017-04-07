export default class CanvasGuideLayer {

  _paper;
  _canvas;
  _grid;

  constructor(paper, canvas) {
    this._paper = paper;
    this._canvas = canvas;
  }

  drawCanvasGrid(viewCenter) {
    let activeTemp = this._paper.project.activeLayer;

    this._grid = new paper.Layer();
    this._grid.name = "grid";
    this._guides = new paper.Layer();
    this._guides.name = "guides";

    this._grid.activate();

    function line(pos, horizontal, color) {
      let to, from, path;

      if (horizontal) {
        from = new Point(pos, 3000);
        to = new Point(pos, -3000);
      } else {
        from = new Point(3000, pos * -1);
        to = new Point(-3000, pos * -1);
      }

      path = new Path.Line(from, to);
      path.strokeColor = color;
    }


    // Grid lines
    let chunk = 100;
    for (let i = chunk; i <= chunk * 10; i += chunk) {
      line(i, true, '#eeeeee');
      line(i, false, '#eeeeee');
    }

    this._grid.sendToBack();

    this._guides.activate();


    // Primary lines
    line(0, true, '#ff9900');
    line(0, false, '#993300');

    this._guides.sendToBack();

    activeTemp.activate();
    this._paper.view.draw();
  }

  destroy() {
    if(this._grid) this._grid.remove();
    if(this._guides) this._guides.remove();
  }

  update() {

  }
};
