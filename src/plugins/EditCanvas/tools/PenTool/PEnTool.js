import ToolInterface from "./../../support/ToolInterface";

export default class PEnTool extends ToolInterface {
  _path = null;
  _segmentText = null;
  _onNextMouseDown = [];
  _mouseDownPoint = null;

  constructor(unicode, paper, canvas) {
    super(canvas);

    this.addSegment = (event, dispatcher) => {
      const segment = new Segment(event.point);

      if(this._path === null) {
        this._path = new Path();
        this._path.selected = true;
        segment.data = {type: "first-segment"};
        this._path.add(segment);
      } else {
        this._path.add(segment);

        segment.path.segments.forEach((seg) => {
          seg.selected = false;
        });
      }

      segment.selected = true;
    };

    /**
     *
     * @param event
     * @param {ToolDispatcherBlueprint} dispatcher
     */
    this.selectSegment = (event, dispatcher) => {
      const hitResult = dispatcher.downBeforeElement.instance;

      hitResult.item.segments.forEach((segment) => {
        segment.selected = false;
      });

      hitResult.segment.selected = true;
    };

    this.makeHandlesAfterAddSegment = (event, dispatcher) => {
      let segment = dispatcher.downAfterElement.instance.segment;

      segment.selected = true;
      segment.handleOut = event.point.subtract(segment.point);
      segment.handleIn = segment.handleOut.multiply(-1);
    };

    this.snapToHorizontalGuide = (event, dispatcher) => {
      const segmentHit = dispatcher.downBeforeElement.instance;
      const guide = dispatcher.hoveredElement.getFirstByType("horizontal-canvas-guide").instance;
      segmentHit.segment.point = new Point(segmentHit.segment.point.x, guide.item.position.y);

    };

    this.snapToVerticalGuide = (event, dispatcher) => {
      const segmentHit = dispatcher.downBeforeElement.instance;
      const guide = dispatcher.hoveredElement.getFirstByType("vertical-canvas-guide").instance;
      segmentHit.segment.point = new Point(guide.item.position.x, segmentHit.segment.point.y);

    };

    this.moveSegment = (event, dispatcher) => {
      const hitResult = dispatcher.downBeforeElement.instance;
      hitResult.segment.point = event.point;
    };

    this.removeSegment = (event, dispatcher) => {
      const hitResult = dispatcher.downBeforeElement.instance;
      hitResult.segment.remove();
    }
  }

  activate() {
    this._tool.activate();
  }
}