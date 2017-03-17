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
  getInitialState() {
    return {
      paperJsInitialized: false,
      glyphSelected: false
    }
  },
  componentDidMount() {
    let _this = this;
    let canvas = this.refs.canvas;


    let glyphSelectHanlder = (unicode) => {
      settings.handleSize = 10;
      paper.setup(canvas);
      _this.setState({paperJsInitialized: true});
      _this.setState({glyphSelected: true});
      EditCanvas.initCanvas(unicode);
      _this.resetCanvasView();
    };

    ecep.on("glyphTile.glyphSelect", glyphSelectHanlder); // user-to-plugin event
    ecep.on("glyphTile.glyphRecall", glyphSelectHanlder); // plugin-to-plugin event

    ecep.emit("ready", canvas);
    ecee.emit("ready", canvas);
  },

  resetCanvasView() {

    paper.view.center = new paper.Point(1400, 400);
    paper.view.zoom = 1;
  },

  clickOn() {
  },

  render() {
    return (
      <div className="centerFrame" ref="root">
        <div style={this.state.paperJsInitialized === false && this.state.glyphSelected === false ? {display: "block"} : {display: "none"}}>
          Working on stuff...
        </div>

        <div style={this.state.paperJsInitialized === true && this.state.glyphSelected === false ? {display: "block"} : {display: "none"}}>
          Please select a glyph...
        </div>

        <div ref="canvasView" style={this.state.paperJsInitialized === true && this.state.glyphSelected === true ? {display: "block"} : {display: "none"}}>
          {/* Show controls only when paper.js is initialized */}
          <div>
            <button onClick={ecee.emit.bind(ecee, "switchTool.penTool")}>Pen Tool</button>
            &nbsp;
            <button onClick={ecee.emit.bind(ecee, "switchTool.panTool")}>Pan</button>
            &emsp;
            <button onClick={ecee.emit.bind(ecee, "clearCanvas")}>Clear Canvas</button>
            &nbsp;
            <button onClick={this.resetCanvasView}>Reset View</button>
            &nbsp;
          </div>
          {/* css width/height properties get overwritten by html attributes (paperjs loads defaults if not preset) */}
          <canvas width="3000" height="2000"
                  ref="canvas"
                  id="editCanvas"
                  onClick={this.clickOn}
                  data-paper-resize={true}/>
        </div>
      </div>
    );
  }
});