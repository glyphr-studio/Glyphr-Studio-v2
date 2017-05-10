import {ToolDispatcher} from "./../ToolDispatcher";
import Destroyable from "./../support/Destroyable";

export default class PointReactive extends Destroyable {
  constructor(arg1, arg2) {
    super();
    let point = new Point(...arguments);
    let tresholdRectangle = new Path.Rectangle({
      center: point,
      size: new Size(8, 8)
    });
    paper.view.draw();
    tresholdRectangle.fillColor = tresholdRectangle.strokeColor = new Color(0, 0, 0);

    let mouseMoveHandler = () => {
      // tresholdRectangle.center = new Point(point.x-4, point.y-4);
    };

    let mouseEnterHandler = () => {
      if (ToolDispatcher.hoveredElementExistsInRegister(point) === false) {
        let hook = ToolDispatcher.pushHoveredElement("Point", point);

        let mouseLeaveHandler = () => {
          ToolDispatcher.removeHoveredElement(hook);
          tresholdRectangle.off("mouseleave", mouseLeaveHandler);
          tresholdRectangle.off("mousemove", mouseMoveHandler);
        };

        this.onDestroy(() => {
          tresholdRectangle.off("mouseleave", mouseLeaveHandler);
        });

        tresholdRectangle.on("mouseleave", mouseLeaveHandler);
        tresholdRectangle.on("mousemove", mouseMoveHandler);
      }
    };

    tresholdRectangle.on("mouseenter", mouseEnterHandler);

    this.onDestroy(() => {
      tresholdRectangle.off("mouseenter", mouseEnterHandler);
      tresholdRectangle.off("mousemove", mouseMoveHandler);
    });

    tresholdRectangle.destroy = this.destroy;

    return point;
  }
}