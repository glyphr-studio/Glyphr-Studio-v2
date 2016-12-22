import CanvasEventUnit from "./../core/canvasEventStream/CanvasEventUnit";

// demo

let lee = new CanvasEventUnit("layer", 3);

lee.on("editCanvas.clearCanvas", () => {
  project.activeLayer.clear();
  view.draw()
})