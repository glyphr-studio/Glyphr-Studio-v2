import "./EditCanvas.scss";
import EventUnit from "./../../lib/core/canvasEventStream/CanvasEventUnit";
import PluginEventUnit from "./../../lib/core/pluginEventStream/PluginEventUnit";
import EditCanvas from "./EditCanvasCore";
import "./PenTool";
import "./PanTool";
import "./Layer";
import config from "./../../config/config";
// import storage from "./../../lib/storage/Storage";

// Canvas Event Stream
let ecee = new EventUnit("editCanvas", 3);
// Plugin Event Stream
let ecep = new PluginEventUnit("editCanvas", 3);


export default React.createClass({

    componentDidMount() {
      let _this = this;
      let canvas = this.refs.canvas;


      let glyphSelectHanlder = (unicode) => {
        settings.handleSize = 10;
        _this.refs.waitView.style.display = "none";
        _this.refs.canvasView.style.display = "block";
        paper.setup(canvas);
        EditCanvas.initCanvas(unicode);
        _this.resetCanvasView();
      };

      ecep.on("glyphTile.glyphSelect", glyphSelectHanlder); // user-to-plugin event
      ecep.on("glyphTile.glyphRecall", glyphSelectHanlder); // plugin-to-plugin event

      ecep.emit("ready", canvas);
      ecee.emit("ready", canvas);
    },

    resetCanvasView(){
        paper.view.center = new paper.Point(1400, 400);
        paper.view.zoom = 1;
    },

    clickOn() {},

    render() {
        return (
            <div className="centerFrame" ref="root">
                {/* Will show when */}
                <div ref="waitView">Please select a glyph...</div>
                <div ref="canvasView" style={{display: "none"}}>
                    <div>
                        <button onClick={ecee.emit.bind(ecee, "switchTool.penTool")}>Pen Tool</button>&nbsp;
                        <button onClick={ecee.emit.bind(ecee, "switchTool.panTool")}>Pan</button>&emsp;
                        <button onClick={ecee.emit.bind(ecee, "clearCanvas")}>Clear Canvas</button>&nbsp;
                        <button onClick={this.resetCanvasView}>Reset View</button>&nbsp;
                    </div>
                    <canvas ref="canvas"
                            id="editCanvas"
                            onClick={this.clickOn}
                            data-paper-resize={true}/>
                </div>
            </div>
        );
    }
});