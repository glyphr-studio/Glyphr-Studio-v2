import CanvasEventUnit from "../../support/canvasEventStream/CanvasEventUnit";
import ToolInterface from "./../../support/ToolInterface";
import PointReactive from "./../../reactives/PointReactive";

const _types = ['point', 'handleIn', 'handleOut'];

export default class PEnTool extends ToolInterface {
  _currentSegment;
  _mode;
  _type;
  _path;
  _hitTolerance = 8;

  constructor(unicode, paper, canvas) {
    super(canvas);

    this.handleMouseDown = (event) => {
      if(!event) return;

      if (this._currentSegment)
        this._currentSegment.selected = false;
      this._mode = this._type = this._currentSegment = null;

      if (!this._path) {
        this._path = new Path();
        this._path.fillColor = {
          hue: 360 * Math.random(),
          saturation: 1,
          brightness: 1,
          alpha: 0.5
        };
      }

      if (this._path.getFirstSegment() && this._path.segments.length < 2) {
        let pointText = new PointText(this._path.getFirstSegment().getPoint().subtract(new PointReactive(0, 15)));
        pointText.setContent("click here to end path")
      }

      let result = this._findHandle(new PointReactive(event.point));

      if (result) {
        this._currentSegment = result.segment;
        this._type = result.type;
        if (this._path.segments.length > 1 && result.type === 'point' && result.segment.index == 0) {
          this._mode = 'close';
          this._path.closed = true;
          this._path.selected = false;
          this._path = null;
        }
      }

      if (this._mode !== 'close') {
        this._mode = this._currentSegment ? 'move' : 'add';
        if (!this._currentSegment)
          this._currentSegment = this._path.add(event.point);
        this._currentSegment.selected = true;
      }
    };

    this.handleMouseMove = (event) => {
      // temporary fix: prevent error
      if(!event || !event.delta || this._currentSegment === null) return;

      if (this._mode === 'move' && this._type === 'point') {
        this._currentSegment.point = event.point;
      } else if (this._mode !== 'close') {
        let delta = event.delta.clone();
        if (this._type === 'handleOut' || this._mode === 'add')
          delta = delta.multiply(-1);
        this._currentSegment.handleIn = this._currentSegment.handleIn.add(delta);
        this._currentSegment.handleOut = this._currentSegment.handleOut.subtract(delta);
      }
    };
  }

  activate() {
    this._tool.activate();
  }

  _findHandle(point) {
    for (let i = 0, l = this._path.segments.length; i < l; i++) {
      for (let j = 0; j < 3; j++) {
        let type = _types[j];
        let segment = this._path.segments[i];
        let segmentPoint = this._type === 'point' ? segment.point : segment.point.add(segment[type]);
        let distance = (point.subtract(segmentPoint)).length;
        if (distance < this._hitTolerance) {
          return {
            type: type,
            segment: segment
          };
        }
      }
    }
    return null;
  }
}