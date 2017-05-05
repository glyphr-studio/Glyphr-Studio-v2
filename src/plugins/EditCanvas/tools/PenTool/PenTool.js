import CanvasEventUnit from "../../support/canvasEventStream/CanvasEventUnit";
import PanToolStorage from "./PanToolStorage";
import ToolInterface from "./../../support/ToolInterface";


export default class PanTool extends ToolInterface {
  constructor(unicode, paper, canvas) {
    super(canvas);
  }

  activate() {
    this._tool.activate();
  }
}