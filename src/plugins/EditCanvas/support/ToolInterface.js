import AbstractImplementationGuard from "./AbstractImplementationGuard";
import CanvasEventUnit from "./canvasEventStream/CanvasEventUnit";

export default class ToolInterface {
  _aig = new AbstractImplementationGuard(this);

  /**
   * @property {CanvasEventUnit}
   */
  _observer;

  constructor() {
    let _this = this;

    /**
     * Contract
     */
    [
      // Activate this tool
      {
        name: "activate",
        signature: "()"
      },

      // Get the tool object
      {
        name: "tool",
        signature: "()"
      }
    ]
      .forEach((method) => {
        if (typeof _this[method.name] !== "function") {
          _this._aig.riseImplementationMissing(method.name, method.signature);
        }
      })

    this._observer = new CanvasEventUnit(this.constructor.name, 3);
  }
}