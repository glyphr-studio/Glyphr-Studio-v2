import {ToolDispatcher} from "./../ToolDispatcher";
import Destroyable from "./../support/Destroyable";

export default class FirstPathSegmentReactive extends Destroyable {
  _segment;

  constructor(point, handleIn, handleOut) {
    super();
    this._segment = new paper.Segment(point, handleIn, handleOut);
    let tresholdRectangle = new paper.Path.Rectangle(new paper.Point(point.x+4, point.y+4), new paper.Point(point.x-4, point.y-4));
    this._tresholdRectangle = tresholdRectangle;
    tresholdRectangle.fillColor = tresholdRectangle.strokeColor = new paper.Color(0, 0);
    paper.view.draw();

    let mouseEnterHandler = () => {
      if (ToolDispatcher.hoveredElementExistsInRegister(this._segment) === false) {
        let hook = ToolDispatcher.pushHoveredElement("FirstPathSegment", this._segment, 1);

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

    this._segment.reactive = this;

    mouseEnterHandler();

    return this;
  }

  set center(point) {
    this._tresholdRectangle.position = point;
  }

  get reactive() {
    return this._segment;
  }
}