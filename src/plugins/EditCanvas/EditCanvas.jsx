import "./EditCanvas.scss";
import EventUnit from "./../../lib/core/canvasEventStream/CanvasEventUnit";
import EditCanvas from "./EditCanvasCore";
import "./PenTool";
import "./PanTool";
import "./Layer";
// import config from "./../../config/config";
// import storage from "./../../lib/storage/Storage";

let ecee = new EventUnit("editCanvas", 3);

export default React.createClass({

    componentDidMount() {
        let canvas = document.getElementById('editCanvas');
        paper.setup(canvas);
        settings.handleSize = 10;
        ecee.emit("ready", canvas);

        let selectedGlyph = this.props.selectedGlyph;
        EditCanvas.initCanvas(selectedGlyph);
        this.resetCanvasView();
        // console.log("Selected glyph at EditCanvas: " + this.props.selectedGlyph);
        // console.log("GlyphrStudio global var: " + window.GlyphrStudio.currentProject);
    },

    resetCanvasView(){
        paper.view.center = new paper.Point(1400, 400);
        paper.view.zoom = 1;
    },

    clickOn() {},

    render() {
        return (
            <div className="centerFrame">
                <div>
                    <button onClick={ecee.emit.bind(ecee, "switchTool.penTool")}>Pen Tool</button>&nbsp;
                    <button onClick={ecee.emit.bind(ecee, "switchTool.panTool")}>Pan</button>&emsp;
                    <button onClick={ecee.emit.bind(ecee, "clearCanvas")}>Clear Canvas</button>&nbsp;
                    <button onClick={this.resetCanvasView}>Reset View</button>&nbsp;
                </div>
                <canvas id="editCanvas"
                        onClick={this.clickOn}
                        data-paper-resize={true}/>
            </div>
        );
    }
});