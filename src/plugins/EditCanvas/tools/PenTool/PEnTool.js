import ToolInterface from "./../../support/ToolInterface";

const _pointTypes = ['point', 'handleIn', 'handleOut'];

export default class PEnTool extends ToolInterface {
  _path = new paper.Path;
  _onNextMouseDown = [];
  _mouseDownPoint = null;

  constructor(unicode, paper, canvas) {
    super(canvas);

    this.setMouseDownPoint = (event) => {
      if(! event) return;
      console.log(`PenTool: setMouseDownPoint`);

      this._mouseDownPoint = event.point;

    };

    this.addPathSegment = (event, dispatcher) => {
      if (!event) return;
      console.log(`PenTool: handleMouseDown`);

      let segment;

      if(this._path.segments.length === 0) {
        segment = new FirstPathSegment(event.point);
      } else {
        segment = new Segment(event.point)
      }

      this.unSelectAllSegments(() => {
        segment.selected = true;
      });

      this._path.add(segment);

    };

    this.closePath = (event, dispatcher) => {
      let segment = dispatcher.initialHoveredElement[0].instance;

      if(this._path.segments.length >= 2) {
        this._path.closePath();
      }

    };

    this.selectPoint = (event, dispatcher) => {
      let segment = dispatcher.initialHoveredElement[0].instance;

      this.unSelectAllSegments(() => {
        segment.selected = true;
      });
    };

    /**
     *
     * @param event
     * @param dispatcher
     */
    this.setHandles = (event, dispatcher) => {
      if (!event || !event.delta) return;
      console.log(`PenTool: setHandles`);

      let segment = dispatcher.initialHoveredElement[0].instance;

      segment.selected = true;
      segment.handleIn = this._mouseDownPoint.subtract(event.point);
      segment.handleOut = this._mouseDownPoint.subtract(event.point).multiply(-1);
    };

    this.moveSegment = (event, dispatcher) => {
      if (!event || !event.delta) return;

      let segment = dispatcher.initialHoveredElement[0].instance;

      this.unSelectAllSegments(() => {
        segment.selected = true;
      });

      segment.point = event.point;
      segment.reactive.center = event.point;

    };

    this.straightLint = () => {

    };

    this.unSelectAllSegments = (callback = () => {
    }) => {
      this._path.segments.forEach((segment) => {
        segment.selected = false;
      });
      callback();
    };

    /**
     * Fires when the hoveredElement.instance is paper.Segment;
     * Selects the corresponding segment
     *
     * @param {paper.MouseEvent} event
     * @param {ToolDispatcher} dispatcher
     */
    this.exclusiveSelectSegment = (event, dispatcher) => {
      this.unSelectAllSegments(() => {
        let segment = dispatcher.hoveredElement[0].instance;
        segment.selected = true;
      });
    }
  }

  activate() {
    this._tool.activate();
  }
}