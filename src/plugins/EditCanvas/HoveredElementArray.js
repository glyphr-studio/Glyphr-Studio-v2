import HoveredElement from "./HoveredElement";

export default class HoveredElementArray {
  /**
   *
   * @type {Array<HoveredElement>}
   * @private
   */
  _hoveredElementBag = [];
  _onRemove = [];

  /**
   * Create an instance with HitResult object
   *
   * @param {HitResult|Array<HitResult>=} result
   * @return {HoveredElementArray}
   */
  constructor(result = null) {
    if (result === null) {
      return this;
    }
    else if (Array.isArray(result) === true) {
      result.forEach((hitResult) => {
        this._hoveredElementBag.push(this._determineResult(hitResult));
      })
    } else if (result instanceof HitResult) {
      // Since segment has no data property, we must perform some extra checks here...
      this._hoveredElementBag.push(this._determineResult(result));

    } else {
      throw new TypeError(`Expected Array or HitResult got ${typeof result}`);
    }

    return this;
  }

  /**
   * Check how to identify the result in respect to a dispatch selector
   *
   * @param {HitResult} result
   * @return {HoveredElement}
   * @private
   */
  _determineResult(result) {
    if (result.segment instanceof Segment && result.segment.isFirst() === true) {
      return new HoveredElement(result, "first-segment");
    }
    else if (result.segment instanceof Segment && result.segment.isLast() === true) {
      return new HoveredElement(result, "last-segment");
    }
    else {
      return new HoveredElement(result, result.item.data.type || result.type);
    }
  }

  /**
   * Remove a hovered element
   *
   * @param {HoveredElement} element
   * @return HoveredElementArray
   */
  push(element) {
    this._hoveredElementBag.push(element);
    return this;
  }

  /**
   * Add a instance to the array
   *
   * @param {*} instance
   * @param {String} name
   * @param {integer} priority
   */
  pushInstance(instance, name, priority) {
    this._hoveredElementBag.push(new HoveredElement(instance, name, priority));
  }

  /**
   * Remove a hovered element
   *
   * @param {HoveredElement} element
   * @return Boolean
   */
  remove(element) {
    this._hoveredElementBag.forEach((target, i) => {
      if (target === element) {
        this._hoveredElementBag.splice(i, 1);

        this._onRemove.forEach((callback) => {
          callback(element);
        });

        return true;
      }
    });

    return false;
  }

  /**
   *  Fetch an element by index
   *
   * @param {index} index
   * @return HoveredElement
   */
  get(index) {
    return this._hoveredElementBag[index];
  }

  /**
   * Check whether an element exists
   *
   * @param {HoveredElement} instance
   * @return {boolean} the element exists
   */
  has(instance) {
    return this._hoveredElementBag.indexOf(instance) !== -1;
  }

  /**
   * Get an element by name
   *
   * @param {string} tag
   * @return {Array} found elements
   */
  getByType(type) {
    const result = [];

    this._hoveredElementBag.forEach((element) => {
      if (element.type === type) {
        result.push(element);
      }
    });

    return result;
  }

  /**
   * Get element with the highest priority
   *
   * @return {null|HoveredElement}
   */
  get highestPriorityElement() {
    let priority = 0;
    let result = null;

    this._hoveredElementBag.forEach((element) => {
      if (element.priority > priority) {
        result = element;
      }
    });

    return result;
  }


  /**
   * Fetch elements based on the underlying instance
   *
   * @param {object} instance
   * @return {Array} {found elements}
   */
  getByInstance(instance) {
    let result = [];

    this._hoveredElementBag.forEach((element) => {
      if (element.instance === instance) {
        this.result.push(element);
      }
    });

    return result;
  }

  /**
   * Get the element with highest priority
   *
   * @return {*}
   */
  get first() {
    return this._hoveredElementBag[0];
  }


  /**
   * Get the total amount of elements
   *
   * @return {Number}
   */
  get length() {
    return this._hoveredElementBag.length;
  }

  /**
   * Check whether an element matches the target; returns the matched elements
   * Single element may match multiple times
   *
   * @param {"*"|String|Array<String>} target
   * @return {Array} found matches
   */
  testAll(target) {
    const matches = [];

    this._hoveredElementBag.forEach((element) => {
      if (element.test(target) === true && matches.indexOf(element) === -1) {
        matches.push(element);
      }
    });

    return matches
  }

  /**
   * Check whether the target is similar to current instance; checking is order-sensitive
   *
   * @param {"*"|Array<String>} target
   */
  equals(target) {
    if (target === "*") {
      return true;
    }
    else if (Array.isArray(target) === true && target.length !== this.length) {
      return false;
    }
    else if (Array.isArray(target) === true && target.length === this.length) {
      for (let i = 0; i < target.length; i++) {
        if (this._hoveredElementBag[i].test(target[i]) === false) {
          return false;
        }
      }

      return true;
    }
    else {
      throw new TypeError(`Expected "*" or Array<String>, got ${typeof target}`);
    }
  }
}