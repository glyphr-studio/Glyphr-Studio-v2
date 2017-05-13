import {ToolDispatcher} from "./../ToolDispatcher";
import Destroyable from "./../support/Destroyable";
import {config} from "./../../../config/config";

// export default class PointReactive extends Destroyable {
//   constructor(arg1, arg2) {
//     super();
//     let point = new paper.Point(arg1, arg2);
//
//     let offset = Math.round(config.handleSize/2);
//     let tresholdRectangle = new paper.Path.Rectangle(new paper.Point(point.x+offset, point.y+offset),
//       new paper.Point(point.x-offset, point.y-offset));
//
//     tresholdRectangle.fillColor = tresholdRectangle.strokeColor = new paper.Color(0, 0, 0);
//     tresholdRectangle.sendToBack();
//     paper.view.draw();
//
//     let mouseEnterHandler = () => {
//       if (ToolDispatcher.hoveredElementExistsInRegister(point) === false) {
//         let hook = ToolDispatcher.pushHoveredElement("Point", point);
//
//         let mouseLeaveHandler = () => {
//           ToolDispatcher.removeHoveredElement(hook);
//           tresholdRectangle.off("mouseleave", mouseLeaveHandler);
//         };
//
//         this.onDestroy(() => {
//           tresholdRectangle.off("mouseleave", mouseLeaveHandler);
//         });
//
//         tresholdRectangle.on("mouseleave", mouseLeaveHandler);
//       }
//     };
//
//     tresholdRectangle.on("mouseenter", mouseEnterHandler);
//
//     this.onDestroy(() => {
//       tresholdRectangle.off("mouseenter", mouseEnterHandler);
//       tresholdRectangle.remove();
//     });
//
//     mouseEnterHandler();
//
//     return point;
//   }
// }