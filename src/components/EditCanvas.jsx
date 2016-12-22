import "./../style/default/EditCanvas";
import * as hlpr from "../utils/helpers";
import EventUnit from "./../lib/core/canvasEventStream/CanvasEventUnit";

import "./../lib/canvas/PenTool";
import "./../lib/canvas/Layer";

let ecee = new EventUnit("editCanvas", 3);


export default React.createClass({

  componentDidMount() {

    let canvas = document.getElementById('editCanvas');
    paper.setup(canvas);
    settings.handleSize = 10;
    ecee.emit("ready", canvas);
  },

  clickOn() {

  },

  render() {
    return (
      <div className="centerframe">
        <div>
          <button onClick={ecee.emit.bind(ecee, "switchTool.penTool")}>Pen Tool</button>
          <button onClick={ecee.emit.bind(ecee, "clearCanvas")}>Clear Canvas</button>
        </div>
        <canvas id="editCanvas"
          onClick={this.clickOn}
          data-paper-resize={true}></canvas>
      </div>
    )
  }
});