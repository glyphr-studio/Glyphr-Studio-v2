import ToolInterface from "./../../support/ToolInterface";
import * as Elements from "./../../Elements";

export default class PEnTool extends ToolInterface {
  _path = null;
  _onNextMouseDown = [];
  _mouseDownPoint = null;

  constructor(unicode, paper, canvas) {
    super(canvas);

    this.setMouseDownPoint = (event) => {
      if (!event || !event.point) return;
      console.log(`PenTool: setMouseDownPoint`);

      this._mouseDownPoint = event.point;

    };

    this.addPathSegment = (event, dispatcher) => {
      if (!event || !event.point) return;
      console.log(`PenTool: handleMouseDown`);

      let segment;

      if(this._path === null) {
        this._path = new Elements.Path({
          fillColor: "black"
        });
      }

      if (this._path.segments.length === 0) {
        segment = new Elements.FirstPathSegment(event.point);
      } else {
        segment = new Elements.Segment(event.point)
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

        if(typeof segment.reactive === "object") {
          segment.reactive.center = segmentPosPoint;
        }

        if(typeof segment.handleIn.reactive !== "undefined") {
          segment.handleIn.reactive.reactive.center = segment.handleIn.reactive.reactive.center.add(event.delta);
        }

        if(typeof segment.handleOut.reactive !== "undefined") {
          segment.handleOut.reactive.reactive.center = segment.handleOut.reactive.reactive.center.add(event.delta);
        }

        segment.point = segmentPosPoint;
      });
    };

    this.removePath = (event, dispatcher) => {
      let segment = dispatcher.initialHoveredElement[0].instance;

      if(this._path !== null) {
        this._path.segments.forEach((segment) => {
          if(typeof segment.reactive !== "undefined") {
            segment.reactive.destroy();
          }

          if(typeof segment.handleOut.reactive !== "undefined") {
            segment.handleOut.reactive.remove();
            delete segment.handleOut.reactive;
          }

          if(typeof segment.handleIn.reactive !== "undefined") {
            segment.handleIn.reactive.remove();
            delete segment.handleIn.reactive;
          }
        });

        this._path.remove();
        this._path = null; // revert to the initial condition
      }
    };

    /**
     *
     * @param event
     * @param dispatcher
     */
    this.removeSegment = (event, dispatcher) => {
      let segment = dispatcher.initialHoveredElement[0].instance;

      if(segment.selected === true) {
        segment.previous.selected = true;
      }

      if(typeof segment.reactive !== "undefined") {
        segment.reactive.destroy();
      }

      if(typeof segment.handleOut.reactive !== "undefined") {
        segment.handleOut.reactive.remove();
        delete segment.handleOut.reactive;
      }

      if(typeof segment.handleIn.reactive !== "undefined") {
        segment.handleIn.reactive.remove();
        delete segment.handleIn.reactive;
      }

      segment.remove();
    };

    /**
     *  Close Path
     * @param event
     * @param dispatcher
     */
    this.closePath = (event, dispatcher) => {
      let segment = dispatcher.initialHoveredElement[0].instance;

      if (this._path.segments.length >= 2) {
        this._path.closePath();
      }
    };

    /**
     *  Add symmetric handles
     * @param event
     * @param dispatcher
     */
    this.setHandles = (event, dispatcher) => {
      if (!event || !event.delta) return;
      console.log(`PenTool: setHandles`);

      let segment = dispatcher.initialHoveredElement[0].instance;

      this.unSelectAllSegments(() => {
        segment.selected = true;

        let handleInPos = this._mouseDownPoint.subtract(event.point);
        let handleOutPos = this._mouseDownPoint.subtract(event.point).multiply(-1);

        segment.selected = true;
        segment.handleIn = handleInPos;
        segment.handleOut = handleOutPos;

        if(typeof segment.handleIn.reactive === "undefined") {
          segment.handleIn.reactive = new Elements.HandleIn(handleInPos);
        }

        if(typeof segment.handleOut.reactive === "undefined") {
          segment.handleOut.reactive = new Elements.HandleOut(handleOutPos);
        }

        segment.handleIn.reactive.reactive.center = segment.point.add(handleInPos);
        segment.handleOut.reactive.reactive.center = segment.point.add(handleOutPos);
      });
    };

    this.moveSegment = (event, dispatcher) => {
      if (!event || !event.delta) return;

      let segment = dispatcher.initialHoveredElement[0].instance;

      this.unSelectAllSegments(() => {
        segment.selected = true;

        if(segment.hasHandles()) {
          if(typeof segment.handleIn.reactive === "undefined") {
            segment.handleIn.reactive = new Elements.HandleIn(segment.point.add(segment.handleIn));
          }

          if(typeof segment.handleOut.reactive === "undefined") {
            segment.handleOut.reactive = new Elements.HandleOut(segment.point.add(segment.handleOut));
          }
        }
      });

      segment.point = segment.point.add(event.delta);
      segment.reactive.center = segment.point;

      if(typeof segment.handleIn.reactive !== "undefined") {
        segment.handleIn.reactive.reactive.center = segment.handleIn.add(segment.point);
      }

      if(typeof segment.handleOut.reactive !== "undefined") {
        segment.handleOut.reactive.reactive.center = segment.handleOut.add(segment.point);
      }
    };

    this.straightLint = () => {

    };

    /**
     *  Unselect all segments and execute the callback afterwards
     * @param callback
     */
    this.unSelectAllSegments = (callback = () => {
    }) => {
      this._path.segments.forEach((segment) => {
        segment.selected = false;

        if(typeof segment.handleOut.reactive !== "undefined") {
          segment.handleOut.reactive.remove();
          delete segment.handleOut.reactive;
        }

        if(typeof segment.handleIn.reactive !== "undefined") {
          segment.handleIn.reactive.remove();
          delete segment.handleIn.reactive;
        }
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

          if(segment.hasHandles()) {
            if(typeof segment.handleIn.reactive === "undefined") {
              segment.handleIn.reactive = new Elements.HandleIn(segment.handleIn.add(segment.point));
            }

            if(typeof segment.handleOut.reactive === "undefined") {
              segment.handleOut.reactive = new Elements.HandleOut(segment.handleOut.add(segment.point));
            }
          }

          segment.selected = true;

        });
      } else {
        segment.selected = false;

        if(segment.hasHandles() === true) {
          if(segment.handleOut.reactive) {
            segment.handleOut.reactive.remove();
            delete segment.handleOut.reactive;
          }

          if(segment.handleIn.reactive) {
            segment.handleIn.reactive.remove();
            delete segment.handleIn.reactive;
          }
        }
      }
    }
  }

  activate() {
    this._tool.activate();
  }
}