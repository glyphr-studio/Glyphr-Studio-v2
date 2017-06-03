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
  }

  activate() {
    this._tool.activate();
  }
}