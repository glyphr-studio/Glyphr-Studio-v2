import SegmentReactive from "./reactives/SegmentReactive";
import FirstPathSegmentReactive from "./reactives/FirstPathSegmentReactive";
import PathReactive from "./reactives/PathReactive";
import PointReactive from "./reactives/PointReactive";

export let Segment = (arg1, arg2, arg3) => {
  let reactiveSegment = new SegmentReactive(arg1, arg2, arg3);
  return reactiveSegment.reactive;
};

export let FirstPathSegment = (arg1, arg2, arg3) => {
  let reactiveSegment = new FirstPathSegmentReactive(arg1, arg2, arg3);
  return reactiveSegment.reactive;
};

export let Path = (arg) => {
  let reactivePath = new PathReactive(arg);
  return reactivePath.reactive;
};

export let HandleIn = (point) => {
  let reactivePoint = new PointReactive(point, "HandleIn", 2);
  return reactivePoint.reactive;
};

export let HandleOut = (point) => {
  let reactivePoint = new PointReactive(point, "HandleOut", 2);
  return reactivePoint.reactive;
};