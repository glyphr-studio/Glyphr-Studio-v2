import ToolInterface from "./../../support/ToolInterface";

export default class PEnTool extends ToolInterface {
  _path = null;
  _onNextMouseDown = [];
  _mouseDownPoint = null;

  constructor(unicode, paper, canvas) {
    super(canvas);

    this.addSegment = (event) => {
      if(this._path === null) {
        this._path = new Path();
        this._path.selected = true;

        const segment = new Segment(event.point);
        segment.data = {type: "first-segment"};
        this._path.add(segment);
      } else {
        this._path.add(new Segment(event.point));
      }
    };

    /**
     *
     * @param event
     * @param {ToolDispatcherBlueprint} dispatcher
     */
    this.selectSegment = (event, dispatcher) => {
      let hitResult = dispatcher.initialHoveredElement.instance;
      hitResult.item.segments.forEach((segment) => {
        segment.selected = false;
      });

      hitResult.segment.selected = true;
    };

    this.addHandles = () => {

    };

    this.snapToHorizontalGuide = (event, dispatcher) => {
      const segmentHit = dispatcher.initialHoveredElement.instance;
      const guide = dispatcher.hoveredElement.getByType("horizontal-canvas-guide")[0].instance;
      segmentHit.segment.point = new Point(segmentHit.segment.point.x, guide.item.position.y);

    };

    this.snapToVerticalGuide = (event, dispatcher) => {
      const segmentHit = dispatcher.initialHoveredElement.instance;
      const guide = dispatcher.hoveredElement.getByType("vertical-canvas-guide")[0].instance;
      segmentHit.segment.point = new Point(guide.item.position.x, segmentHit.segment.point.y);

    };

    this.moveSegment = (event, dispatcher) => {
      let hitResult = dispatcher.initialHoveredElement.instance;
      hitResult.segment.point = event.point;
    };

    this.removeSegment = (event, dispatcher) => {
      let hitResult = dispatcher.initialHoveredElement.instance;
      console.warn("shitt")
      hitResult.segment.remove();
    }
  }

  activate() {
    this._tool.activate();
  }
}