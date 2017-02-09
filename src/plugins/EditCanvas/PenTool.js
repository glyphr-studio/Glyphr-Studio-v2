import CanvasEventUnit from "./../core/canvasEventStream/CanvasEventUnit";

// a simple demo of a bezier tool

let ppe = new CanvasEventUnit("penTool", 3);

ppe.on("editCanvas.switchTool.penTool", () => {
  if(tool) tool.remove();
  activatePen();
});

function activatePen() {
  let pen = new Tool();
  let hitTolerance = 8;
  let path;
  let types = ['point', 'handleIn', 'handleOut'];
  function findHandle(point) {
    for (let i = 0, l = path.segments.length; i < l; i++) {
      for (let j = 0; j < 3; j++) {
        let type = types[j];
        let segment = path.segments[i];
        let segmentPoint = type == 'point'
          ? segment.point
          : segment.point.add(segment[type]);
        let distance = (point.subtract(segmentPoint)).length;
        if (distance < hitTolerance) {
          return {
            type: type,
            segment: segment
          };
        }
      }
    }
    return null;
  }

  let currentSegment, mode, type;
  pen.onMouseDown = function(event) {
    if (currentSegment)
      currentSegment.selected = false;
    mode = type = currentSegment = null;

    if (!path) {
      path = new Path();
      path.fillColor = {
        hue: 360 * Math.random(),
        saturation: 1,
        brightness: 1,
        alpha: 0.5
      };
    }

    if(path.getFirstSegment() && path.segments.length < 2) {
      let pointText = new PointText(path.getFirstSegment().getPoint().subtract(new Point(0, 15)));
      pointText.setContent("click here to end path")
    }

    let result = findHandle(event.point);
    if (result) {
      currentSegment = result.segment;
      type = result.type;
      if (path.segments.length > 1 && result.type == 'point'
        && result.segment.index == 0) {
        mode = 'close';
        path.closed = true;
        path.selected = false;
        path = null;
      }
    }

    if (mode != 'close') {
      mode = currentSegment ? 'move' : 'add';
      if (!currentSegment)
        currentSegment = path.add(event.point);
      currentSegment.selected = true;
    }
  }

  pen.onMouseDrag = function (event) {
    if (mode == 'move' && type == 'point') {
      currentSegment.point = event.point;
    } else if (mode != 'close') {
      let delta = event.delta.clone();
      if (type == 'handleOut' || mode == 'add')
        delta = delta.multiply(-1);
      currentSegment.handleIn = currentSegment.handleIn.add(delta);
      currentSegment.handleOut = currentSegment.handleOut.subtract(delta);
    }
  }
}

