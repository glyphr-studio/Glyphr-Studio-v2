import AbstractImplementationGuard from "./AbstractImplementationGuard";

export default class CanvasInterface {
  _aig = new AbstractImplementationGuard(this);


  constructor() {
    let _this = this;

    /**
     * Contract
     * These are the methods which the extending class has to declare, otherwise the developer will be reminded
     * to declare these methods with an error.
     */
    [
      // Activate this tool
      {
        name: "activateDefaultTool",
        signature: "()"
      },
      {
        name: "getDefaultTool",
        signature: "()"
      }
    ]
      .forEach((method) => {
        if (typeof _this[method.name] !== "function") {
          _this._aig.riseImplementationMissing(method.name, method.signature);
        }
      });
  }
}