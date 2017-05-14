import ToolInterface from "./../../support/ToolInterface";

const _pointTypes = ['point', 'handleIn', 'handleOut'];

export default class PEnTool extends ToolInterface {
  _path = null;
  _onNextMouseDown = [];
  _mouseDownPoint = null;

  constructor(unicode, paper, canvas) {
    super(canvas);

    this.setMouseDownPoint = (event) => {
      if (!event) return;
      console.log(`PenTool: setMouseDownPoint`);

      this._mouseDownPoint = event.point;

    };

    this.addPathSegment = (event, dispatcher) => {
      if (!event) return;
      console.log(`PenTool: handleMouseDown`);

      let segment;

      if(this._path === null) {
        this._path = new Path({
          fillColor: "black"
        });
      }

      if (this._path.segments.length === 0) {
        segment = new FirstPathSegment(event.point);
      } else {
        segment = new Segment(event.point)
      }

      this.unSelectAllSegments(() => {
        segment.selected = true;
      });

      this._path.add(segment);

    };

    this.movePath = (event, dispatcher) => {
      if(! event || ! event.delta) return;

      let path = dispatcher.initialHoveredElement[0].instance;

      path.segments.forEach((segment) => {
        let segmentPosPoint = segment.point.add(event.delta);
        segment.point = segmentPosPoint;

        if(segment.reactive) {
          segment.reactive.center = segmentPosPoint;
        }
      })
    };

    this.removePath = (event, dispatcher) => {
      let segment = dispatcher.initialHoveredElement[0].instance;

      if(this._path !== null) {
        this._path.remove();
        this._path = null; // revert to the initial condition
      }
    };

    this.removeSegment = (event, dispatcher) => {
      let segment = dispatcher.initialHoveredElement[0].instance;

      if(segment.selected === true) {
        segment.previous.selected = true;
      }
      segment.remove();
    };

    this.closePath = (event, dispatcher) => {
      let segment = dispatcher.initialHoveredElement[0].instance;

      if (this._path.segments.length >= 2) {
        this._path.closePath();
      }

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
      let segment = dispatcher.initialHoveredElement[0].instance;

      if (segment.selected === false) {
        this.unSelectAllSegments(() => {
          segment.selected = true;
        });
      } else {
        segment.selected = false;
      }
    }
  }

  activate() {
    this._tool.activate();
  }
}