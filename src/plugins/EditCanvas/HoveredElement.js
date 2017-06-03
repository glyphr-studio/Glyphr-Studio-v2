export default class HoveredElement {
  _type;
  _priority;
  _instance;
  _onPriorityChange = [];
  _onInstanceChange = [];
  _priorities = {
    'first-segment': 502,
    'last-segment': 501,
    'segment': 500,
    'handle-in': 499,
    'handle-out': 498,
    'path': 497,
    'canvas-guide-vertical': 497,
    'canvas-guide-horizontal': 497,
    'curve': 497,
    'stroke': 497,
    'fill': 496,
    'bounds': 495,
    'center': 495,
    'pixel': 494

  };

  /**
   *
   * @param {*} instance
   * @param {String} type
   * @param {Number=} priority
   */
  constructor(instance, type, priority) {
    this._instance = instance;
    this._type = type;

    if(typeof this._priorities[type] === "undefined") {
      throw TypeError(`Priority of ${type} has not been specified`);
    } else {
      this._priority = this._priorities[type];
    }
  }

  get type() {
    return this._type;
  }

  set type(name) {
    this._type = name;
  }

  /**
   * Get the priority of the element
   *
   * @return {integer}
   */
  get priority() {
    return this._priority;
  }

  /**
   * Max priority is 9999; non-negative numbers
   *
   * @param {integer} priority
   */
  set priority(priority) {
    if(priority > 9999 || priority < 0) throw new Error("Priority must be between 0 and 9999");
    this._priority = priority;

    this._onPriorityChange.forEach((callback) => {
      callback();
    })
  }

  /**
   * Get the underlying instnace
   *
   * @return {HitResult}
   */
  get instance() {
    return this._instance;
  }

  /**
   * Set the hit
   *
   * @param {HitResult} instance
   */
  set instance(instance) {
    this._instance = instance;
    this._onInstanceChange.forEach((callback) => {
      callback(instance);
    })
  }

  /**
   * Stop a callback from firing
   *
   * @param callback
   * @return {bool} the element has been removed
   */
  removeOnInstanceChange(callback) {
    const index = this._onInstanceChange.indexOf(callback);
    if(index !== -1) {
      this._onInstanceChange.splice(index, 1);
      return true;
    }

    return false;
  }

  /**
   * Add an event listener on priority change
   *
   * @param callback
   */
  onPriorityChange(callback) {
    this._onPriorityChange.push(callback);
  }

  /**
   * Remove an onPriorityChange event listener
   *
   * @param callback
   */
  removeOnPriorityChange(callback) {
    this._onPriorityChange.forEach((target, i) => {
      if(callback === target) {
        this._onPriorityChange.splice(i, 1);
      }
    })
  }

  /**
   * Check whether the element is matched by the target
   *
   * @param {"*"|String|Array<String>} target
   * @return {Boolean}
   */
  test(target) {
    if(typeof target === "string" && target === "*") {
      return true;
    }
    else if(typeof target === "string") {
      return this._type === target;
    }
    else if(Array.isArray(target) === true) {
      return target.indexOf(this._type) !== -1;
    } else {
      throw new TypeError(`Expected "*" or Array<String> got ${typeof target}`);
    }
  }
}