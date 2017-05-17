import {ToolDispatcher} from "./../ToolDispatcher";
import Destroyable from "./../support/Destroyable";

export default class PointReactive extends Destroyable {
  _tresholdRectangle = null;

  constructor(point, hoveredElement, priority) {
    super();
    let tresholdRectangle = new paper.Path.Rectangle(new paper.Point(point.x+4, point.y+4), new paper.Point(point.x-4, point.y-4));
    this._tresholdRectangle = tresholdRectangle;

    tresholdRectangle.bringToFront();
    tresholdRectangle.fillColor = tresholdRectangle.strokeColor = new paper.Color(0, 0);
    paper.view.draw();

    let mouseEnterHandler = () => {
      if (ToolDispatcher.hoveredElementExistsInRegister(this._tresholdRectangle) === false) {
        let hook = ToolDispatcher.pushHoveredElement(hoveredElement || "Point", this._tresholdRectangle, priority || 1);

        let mouseMoveHandler = (event) => {
          if(tresholdRectangle.contains(event.point) === false) {
            ToolDispatcher.removeHoveredElement(hook);
            paper.view.off("mousemove", mouseMoveHandler);
          }
        };

        this.onDestroy(() => {
          paper.view.off("mousemove", mouseMoveHandler);
          tresholdRectangle.remove();
        });

        paper.view.on("mousemove", mouseMoveHandler);
      }
    };

    tresholdRectangle.on("mouseenter", mouseEnterHandler);

    this.onDestroy(() => {
      tresholdRectangle.off("mouseenter", mouseEnterHandler);

    });

    this._tresholdRectangle.reactive = this;

    return this;
  }

  set center(point) {
    this._tresholdRectangle.position = point;
  }

  get center() {
    return this._tresholdRectangle.position;
  }

  get reactive() {
    return this._tresholdRectangle;
  }
}