import CanvasEventUnit from "../support/canvasEventStream/CanvasEventUnit";
import PluginEventUnit from "./../../../lib/core/pluginEventStream/PluginEventUnit";
import "./../tools/PanTool/PanTool";
import config from "./../../../config/config";
import EditCanvasStorage from "./EditViewStorage";
import UnicodeGlyphCanvas from "../UnicodeGlyphCanvas";
import style from "./../EditCanvas";
import {ToolDispatcher} from "./../ToolDispatcher";

// GlyphCanvas Event Stream
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
      glyphCanvas: null
    }
  },
  componentWillUnmount() {
    ecep.destroy();
    ecee.destroy();
    if(this.state.glyphCanvas !== null) {
      this.state.glyphCanvas.destroy();
    }
  },
  componentDidMount() {
    let _this = this;
    let canvas = this.refs.canvas;

    let glyphSelectHanlder = (unicode) => {
      if(this.state.glyphCanvas !== null) {
        this.state.glyphCanvas.destroy();
      }

      // temporary fix for #6 (initializing GlyphCanvas twice)
        let glyphCanvas = new UnicodeGlyphCanvas(unicode, window.paper, canvas);
        glyphCanvas.destroy();
        this.setState({glyphCanvas: new UnicodeGlyphCanvas(unicode, window.paper, canvas)});

      _this.setState({paperJsInitialized: true});
      _this.setState({glyphSelected: true});
    };

    ecep.on("glyphTile.glyphRecall", glyphSelectHanlder); // plugin-to-plugin event
    ecep.on("glyphTile.glyphSelect", glyphSelectHanlder); // plugin-to-plugin event

    ecep.emit("ready", canvas);
    ecee.emit("ready", canvas);


  },
  clickOn() {
  },

  render() {
    return (
      <div className="centerFrame" ref="root">
        <style>{`${style}`}</style>

        <div style={this.state.paperJsInitialized === false && this.state.glyphSelected === false ? {display: "block"} : {display: "none"}}>
          This is your first time opening the app. Select a glyph tile from the glyph chooser.
        </div>

        <div ref="canvasView" style={this.state.paperJsInitialized === true && this.state.glyphSelected === true ? {display: "block"} : {display: "none"}}>
          {/* Show controls only when paper.js is initialized */}
          <div>
            <button onClick={() => {ToolDispatcher.selectedTool = "penTool"}}>Pen Tool</button>
            &nbsp;
            {this.state.glyphCanvas !== null && <button onClick={() => {ToolDispatcher.selectedTool = "panTool"}}>Pan Tool</button>}
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