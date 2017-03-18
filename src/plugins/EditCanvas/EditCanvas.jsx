import "./EditCanvas.scss";
import CanvasEventUnit from "./../../lib/core/canvasEventStream/CanvasEventUnit";
import PluginEventUnit from "./../../lib/core/pluginEventStream/PluginEventUnit";
import EditCanvas from "./EditCanvasCore";
import "./PenTool";
import "./PanTool/PanTool";
import "./Layer";
import config from "./../../config/config";
import EditCanvasStorage from "./EditCanvasStorage";

// Canvas Event Stream
let ecee = new CanvasEventUnit("editCanvas", 3);
// Plugin Event Stream
let ecep = new PluginEventUnit("editCanvas", 3);

let myStorage = new EditCanvasStorage();

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  getInitialState() {
    return {
      paperJsInitialized: false,
      glyphSelected: false,
      panToolReady: false,
    }
  },
  componentDidMount() {
    let _this = this;
    let canvas = this.refs.canvas;

    let glyphSelectHanlder = (unicode) => {
      settings.handleSize = 10;

      _this.updateCanvasSize(unicode);
      paper.setup(canvas);
      myStorage.setCurrentGlyphUnicode(unicode);

      let windowResizeHandler = () => {
       _this.updateCanvasSize(unicode);
        paper.project.remove();
        paper.setup(canvas);
        ecee.emit("canvasReady", {
          canvas: canvas,
          unicode: unicode
        });
      };

      let glyphChangeHandler = () => {
        window.removeEventListener("resize", windowResizeHandler);
        ecep.off(glyphChangeHandler);
      };
      ecep.on("glyphTile.glyphSelect", glyphChangeHandler);

      window.addEventListener("resize", windowResizeHandler);

      ecee.emit("canvasReady", {
        canvas: canvas,
        unicode: unicode
      });

      _this.setState({paperJsInitialized: true});
      _this.setState({glyphSelected: true});
    };

    ecep.on("glyphTile.glyphSelect", glyphSelectHanlder); // user-to-plugin event
    ecep.on("glyphTile.glyphRecall", glyphSelectHanlder); // plugin-to-plugin event

    ecee.on("panTool.ready", () => {
      // To show the loading in of the pan tool button...
      setTimeout(_this.setState.bind(_this, {panToolReady: true}), 2000)
    });

    ecep.emit("ready", canvas);
    ecee.emit("ready", canvas);


  },

  updateCanvasSize(unicode) {
    // todo: calculate 400 and 140 dynamically
    this.refs.canvas.setAttribute("width", window.innerWidth-400);
    this.refs.canvas.setAttribute("height", window.innerHeight-140);
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
          This is your first time opening the app. Select a glyph tile from the glyph chooser.
        </div>

        <div ref="canvasView" style={this.state.paperJsInitialized === true && this.state.glyphSelected === true ? {display: "block"} : {display: "none"}}>
          {/* Show controls only when paper.js is initialized */}
          <div>
            <button onClick={ecee.emit.bind(ecee, "switchTool.penTool")}>Pen Tool</button>
            &nbsp;
            <button style={this.state.panToolReady === true ? {display: "none"} : {display: "inline-block"}}>Pan tool is loading in...</button>
            <button style={this.state.panToolReady === true ? {display: "inline-block"} : {display: "none"}} onClick={ecee.emit.bind(ecee, "switchTool.panTool", myStorage.getCurrentGlyphUnicode())}>Pan</button>
            &emsp;
            <button onClick={ecee.emit.bind(ecee, "clearCanvas")}>Clear Canvas</button>
            &nbsp;
            <button onClick={this.resetCanvasView}>Reset View</button>
            &nbsp;
          </div>
          <div className="functionBar">function bar stuff (content depends on the selected tool) ...</div>
          {/* css width/height properties get overwritten by html attributes (paperjs loads defaults if not preset) */}
          <canvas width="3000" height="3000"
                  ref="canvas"
                  id="editCanvas"
                  onClick={this.clickOn}
                  data-paper-resize={true}/>
          <div className="statusBar">status bar stuff (content depends on the selected tool)...</div>
        </div>
      </div>
    );
  }
});