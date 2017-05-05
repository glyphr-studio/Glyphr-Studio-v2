import AbstractImplementationGuard from "./AbstractImplementationGuard";
import Destroyable from "./Destroyable"

export default class CanvasInterface extends Destroyable {
  _aig = new AbstractImplementationGuard(this);


  constructor() {
    super();
    let _this = this;

    /**
     * Contract
     * These are the methods which the extending class has to declare, otherwise the developer will be reminded
     * to declare these methods with an error.
     */
    [].forEach((method) => {
        if (typeof _this[method.name] !== "function") {
          _this._aig.riseImplementationMissing(method.name, method.signature);
        }
      });
  }
}