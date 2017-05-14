import {ToolDispatcher} from "./../ToolDispatcher";
import SegmentReactive from "./../reactives/SegmentReactive";
import FirstPathSegmentReactive from "../reactives/FirstPathSegmentReactive";
import PathReactive from "../reactives/PathReactive";

// todo: implement ReactiveTypes
// Point = (arg1, arg2) => {
//   let point = new PointReactive(arg1, arg2);
//
//   point.remove = () => {
//     point.destroy();
//     point.remove();
//   };
//
//   return point;
// };

window.Segment = (arg1, arg2, arg3) => {
  let reactiveSegment = new SegmentReactive(arg1, arg2, arg3);

  reactiveSegment.remove = () => {
    reactiveSegment.destroy();
    reactiveSegment.segment.remove();
  };

  return reactiveSegment.reactive;
};

window.FirstPathSegment = (arg1, arg2, arg3) => {
  let reactiveSegment = new FirstPathSegmentReactive(arg1, arg2, arg3);

  reactiveSegment.remove = () => {
    reactiveSegment.destroy();
    reactiveSegment.segment.remove();
  };

  return reactiveSegment.reactive;
};

window.Path = (arg) => {
  let reactivePath = new PathReactive(arg);

  reactivePath.remove = () => {
    reactivePath.destroy();
    reactivePath.segment.remove();
  };

  return reactivePath.reactive;
};