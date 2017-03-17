import CanvasEventUnit from "../../../lib/core/canvasEventStream/CanvasEventUnit";
import PanToolStorage from "./PanToolStorage";
import EditCanvasCore from "./../EditCanvasCore"

let pan = new CanvasEventUnit("panTool", 3);
let myStorage;
let currentGlyphUnicode;

pan.on("editCanvas.ready", () => {
  pan.on("editCanvas.switchTool.panTool", (unicode) => {
    if (tool) tool.remove();
    activatePanTool();
  });

  // ready for the user to use
  pan.emit("ready");
});

pan.on("editCanvas.canvasReady", (data) => {
  myStorage = new PanToolStorage(data.unicode);
  currentGlyphUnicode = data.unicode;
  let glyphPanPosition = myStorage.getGlyphPanPosition(data.unicode);
  view.center = new paper.Point(glyphPanPosition.x, glyphPanPosition.y);
  paper.project._needsUpdate = true;
  EditCanvasCore.initCanvas(data.unicode);
});

function activatePanTool() {
  let pan = new Tool();
  let mouseStart = false;
  let viewStart = false;

  document.body.style.cursor = 'move';
  console.log("Activate PAN Tool");

  pan.onMouseDown = function (e) {
    viewStart = view.center;
    // Have to use native mouse offset, because e.delta changes as the view is scrolled.
    mouseStart = new paper.Point(e.event.offsetX, e.event.offsetY);
  }

  pan.onMouseUp = function () {
    if (mouseStart) {
      mouseStart = false;
      viewStart = false;
    }
  }

  pan.onMouseDrag = function (e) {
    if (viewStart) {
      let x,y, nativeDelta = new paper.Point(
        x = e.event.offsetX - mouseStart.x,
        y = e.event.offsetY - mouseStart.y
      );

      // Move into view coordinates to subtract delta, then back into project coords.
      view.center = view.viewToProject(
        view.projectToView(viewStart).subtract(nativeDelta)
      );

      // In the future, for performance reasons, we might want to save in between user switching the glyphs
      // or/and some other less dense events.
      myStorage.setGlyphPanPosition(currentGlyphUnicode, {x: view.center.x, y: view.center.y});
    }
  }
}

