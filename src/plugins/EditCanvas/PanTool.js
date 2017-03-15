import CanvasEventUnit from "./../../lib/core/canvasEventStream/CanvasEventUnit";

let pan = new CanvasEventUnit("panTool", 3);

pan.on("editCanvas.switchTool.panTool", () => {
    if(tool) tool.remove();
    activatePanTool();
});

function activatePanTool() {
    let pan = new Tool();
    let mouseStart = false;
    let viewStart = false;

    document.body.style.cursor = 'move';
    console.log("Activate PAN Tool");

    pan.onMouseDown = function(e) {
        viewStart = view.center;
        // Have to use native mouse offset, because e.delta changes as the view is scrolled.
        mouseStart = new paper.Point(e.event.offsetX, e.event.offsetY);
    }

    pan.onMouseUp = function() {
        if(mouseStart) {
            mouseStart = false;
            viewStart = false;
        }
    }

    pan.onMouseDrag = function(e) {
        if(viewStart){
            let nativeDelta = new paper.Point(
                e.event.offsetX - mouseStart.x,
                e.event.offsetY - mouseStart.y
            );

            // Move into view coordinates to subtract delta, then back into project coords.
            view.center = view.viewToProject(
                view.projectToView(viewStart).subtract(nativeDelta)
            );
        }
    }
}

