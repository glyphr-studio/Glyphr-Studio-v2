import Destroyable from "./support/Destroyable";
import {CanvasCursor} from "./support/CanvasCursor";
import HoveredElementArray from "./HoveredElementArray";
import HoveredElement from "./HoveredElement";

class ToolDispatcherBlueprint extends Destroyable {
  _tool;
  _dispatchRegister = null;
  _paper;
  _canvas;
  _mousedownPoint = null;

  // Used to prevent nesting of dispatch direcives.
  // I.e. a handler of an event can't force a dispatch
  _executingDispatch = false;

  _state = {
    selectedTool: null,

    // todo: integrate reactives
    selectedElement: null,

    // Element which has been hovered at the moment of mousedown;
    // Gets reset at mouseup.

    /**
     * @type {HoveredElement|null}
     */
    downBeforeElement: null,
    downAfterElement: null,
    downMoveElement: null,

    // todo: fix double when 1. creating point 2. moving on the point
    hoveredElement: new HoveredElementArray(),

    // todo: cover ctrl+t case
    // todo: support key combinations
    keyboardKeyDown: false,
    keyboardKey: [],
    mousedown: false,
    mousemove: false
  };

  constructor(paper) {
    super();

    // Disable all default key bindings
    window.onkeydown = e => e.preventDefault();

    // Reset key status for example when Alt+Tab is pressed on Windows etc.
    window.onblur = () => {
      this._state.keyboardKey = [];
      this._state.keyboardKeyDown = false;
    };

    let keysPushedAndDown = [];

    this._tool = new paper.Tool();
    this._paper = paper;

    let updateHoveredElementOnMouseMove = (event) => {
      this._state.hoveredElement = new HoveredElementArray(paper.project.hitTestAll(event.point, {fill: true, stroke: true, handles: true, segments: true, tolerance: 8}));
    };

    let dispatchOnKeyDown = (event) => {
      this._state.keyboardKeyDown = true;
      if (keysPushedAndDown.indexOf(event.code) === -1) {
        this._state.keyboardKey.push(event.code);
        keysPushedAndDown.push(event.code);
      }

      this.dispatch(event);
    };

    let dispatchOnKeyUp = (event) => {
      for (let i = this._state.keyboardKey.length - 1; i >= 0; i--) {
        if (this._state.keyboardKey[i] === event.code) {
          this._state.keyboardKey.splice(i, 1);
          break;
        }
      }
      keysPushedAndDown.splice(keysPushedAndDown.indexOf(event.code), 1);
      this._state.keyboardKeyDown = false;

      this.dispatch(event);
    };

    let dispatchOnMouseDown = (event) => {
      this._state.mousemove = false;
      this._state.mousedown = true;
      this._mousedownPoint = event.point;
      this._state.downBeforeElement = this._state.hoveredElement.highestPriorityElement;

      this.dispatch(event);

      const result = new HoveredElementArray(paper.project.hitTestAll(event.point, {fill: true, stroke: true, handles: true, segments: true, tolerance: 8}));
      this._state.downAfterElement = result.highestPriorityElement;
    };

    let dispatchOnMouseUp = (event) => {
      this._state.mousedown = false;
      this._state.mousemove = false;

      // Guaranteed that after mouseup initialHoveredElement will be empty
      this._state.downBeforeElement = null;
      this._state.downAfterElement = null;
      this._state.downMoveElement = null;

      this.dispatch(event);

      this._state.hoveredElement = new HoveredElementArray(paper.project.hitTestAll(event.point, {fill: true, stroke: true, segments: true, handles: true, tolerance: 8}));
    };

    let dispatchOnMouseMove = (event) => {
      this._state.mousemove = true;

      if(this._state.mousedown === true && this._state.hoveredElement.highestPriorityElement !== null
        && (this.downMoveElement === null || this._state.hoveredElement.highestPriorityElement.priority > this._state.downMoveElement.priority)) {
        this._state.downMoveElement = this._state.hoveredElement.highestPriorityElement;
      }

      this.dispatch(event);
    };

    this._tool.on("mousemove", updateHoveredElementOnMouseMove);
    this._tool.on("mousemove", dispatchOnMouseMove);
    window.addEventListener("keydown", dispatchOnKeyDown);
    window.addEventListener("keyup", dispatchOnKeyUp);
    this._tool.on("mouseup", dispatchOnMouseUp);
    this._tool.on("mousedown", dispatchOnMouseDown);

    this.onDestroy(() => {
      // window.removeEventListener("keydown", dispatchOnKeyUp);
      // window.removeEventListener("keyup", dispatchOnKeyUp);
      // this._tool.off("mouseup", dispatchOnMouseUp);
      // this._tool.off("mousedown", mouseDownHandler);
      // this._tool.off("mousemove", mouseDownHandler);
    })
  }

  /**
   * Check whether the object is valid
   *
   * @param {Object} state
   * @return {Array|Array<String>}
   * @private
   */
  _validate(state) {
    let errorMessage = [];

    if(state.selectedTool !== null && typeof state.selectedTool !== "string") {
      errorMessage.push(`selectedTool must be "*", null or string`);
    }

    if(state.selectedElement !== null && state.selectedElement !== "*") {
      errorMessage.push(`selectedElement must be either "*" or null`);
    }

    if(state.downBeforeElement !== null && typeof state.downBeforeElement !== "string") {
      errorMessage.push(`downBeforeElement must be "*", null or String`);
    }

    if(state.downAfterElement !== null && typeof state.downAfterElement !== "string") {
      errorMessage.push(`downAfterElement must be "*", null or String`);
    }

    if(state.downMoveElement !== null && typeof state.downMoveElement !== "string") {
      errorMessage.push(`downMoveElement must be "*", null or String`);
    }

    if(state.hoveredElement !== null && typeof state.hoveredElement !== "string") {
      // todo: low pri, check whether the selector is valid
      errorMessage.push(`hoveredElement must be either "*" or null`);
    }

    if(Array.isArray(state.keyboardKey) === false) {
      errorMessage.push("keyboardKey must be Array<String>");
    } else {
      state.keyboardKey.forEach((element, i) => {
        if(typeof element !== "string") {
          errorMessage.push(`keyboardKey must be Array<string>; expected string at index ${i} but got ${typeof element} instead`);
        }
      });
    }

    if(typeof state.keyboardKeyDown !== "boolean" && state.keyboardKeyDown !== "*") {
      errorMessage.push(`keyboardKeyDown must be either "*" or boolean`);
    }

    if(typeof state.mousedown !== "boolean" && state.mousedown !== "*") {
      errorMessage.push(`mousedown must be either "*" or boolean`);
    }

    if(typeof state.mousemove !== "boolean" && state.mousemove !== "*") {
      errorMessage.push(`mousemove must be either "*" or boolean`);
    }

    if(typeof state.handler !== "function") {
      errorMessage.push(`handler must be a function`);
    }

    if(typeof state.cursor !== "string") {
      errorMessage.push(`cursor must be a string`);
    }

    return errorMessage;
  }

  /**
   * Check whether the target matches current state's keyboardKey
   *
   * @private
   * @param {"*"|Array<String>} keyboardKey
   * @return {Boolean} target matches current state
   */
  _matchKeyboardKey(keyboardKey) {
    if(this._state.keyboardKey.length !== keyboardKey.length) {
      return false;
    } else {
      for(let i=0; i<keyboardKey.length; i++) {
        if(this._state.keyboardKey[i] !== keyboardKey[i]) {
          return false;
        }
      }

      return true;
    }
  }

  /**
   * Check if there is a state match for the current canvas state in respect to tools
   * @param event
   */
  dispatch(event) {
    if (this._executingDispatch === true) return;

    const stateTemp = this._state;
    console.time("ToolDispatcher: dispatch");

    let dispatched = false;
    this._dispatchRegister.forEach((entry, i) => {
      this._executingDispatch = true;

      let entryLength = Object.values(entry).length;
      let registerLength = Object.values(stateTemp).length;
      if (entryLength - 2 !== registerLength) {
        console.warn(entry, this._state);
        throw new Error(`Entry length (${entryLength}) and register length (${registerLength}) must differ by 2 (the handler and cursor)`);
      }

      let hitArray = {
        // "*" stands for any possible value
        "selectedTool": entry.selectedTool === stateTemp.selectedTool || entry.selectedTool === "*",
        "selectedElement": entry.selectedElement === stateTemp.selectedElement || entry.selectedElement === "*",
        "keyboardKeyDown": entry.keyboardKeyDown === stateTemp.keyboardKeyDown || entry.keyboardKeyDown === "*",
        "mousedown": entry.mousedown === stateTemp.mousedown || entry.mousedown === "*",
        "mousemove": entry.mousemove === stateTemp.mousemove || entry.mousemove === "*",
    };

      if(entry.downBeforeElement === "*") {
        hitArray["downBeforeElement"] = true;
      }
      else if(this._state.downBeforeElement === null || entry.downBeforeElement === null) {
        hitArray["downBeforeElement"] = (this._state.downBeforeElement === entry.downBeforeElement);
      }
      else {
        hitArray["downBeforeElement"] = this._state.downBeforeElement.test(entry.downBeforeElement);
      }

      if(entry.downMoveElement === "*") {
        hitArray["downMoveElement"] = true;
      }
      else if(this._state.downMoveElement === null || entry.downMoveElement === null) {
        hitArray["downMoveElement"] = (this._state.downMoveElement === entry.downMoveElement);
      }
      else {
        hitArray["downMoveElement"] = this._state.downMoveElement.test(entry.downMoveElement);
      }

      hitArray["hoveredElement"] = this._state.hoveredElement.equals(entry.hoveredElement);

      if((entry.keyboardKey.length === 0 && entry.keyboardKeyDown === true) || entry.keyboardKey.length > 0 && entry.keyboardKeyDown === false) {
        console.warn(entry);
        throw new Error("Dispatch request contradicts itself, please inspect keyboardKey and keyboardKeyDown in the entry logged above.");
      }

      hitArray["keyboardKey"] = this._matchKeyboardKey(entry.keyboardKey);

      if (Object.values(hitArray).indexOf(false) === -1) {
        if (dispatched !== false) {
          console.warn("State collision", i, entry, dispatched.index, dispatched.entry);
        }
        dispatched = {entry: entry, index: i};
        CanvasCursor.set(entry.cursor, this._canvas);
        entry.handler(event, this);
      }
    });

    this._executingDispatch = false;
    console.timeEnd("ToolDispatcher: dispatch");
  }

  /**
   *  Sets selectedTool of the current state
   *
   * @param {string} name
   */
  set selectedTool(name) {
    this.dispatch({selectedTool: name});

    this._state.selectedTool = name;
    this._state.mousemove = true;

    this.dispatch();
  }


  /**
   *  Set the selected element to the current state
   *
   * @param {string} name
   * @param {*} instance
   */
  pushSelectedElement(name, instance) {
    this._state.selectedElement = {name: name, instance: instance};

    this._state.mousemove = true;
    this.dispatch();
  }

  /**
   *  Remove a selected element from the current state
   *
   * @param {string} name
   * @param {*} instance
   * @return {undefined|*}  Returns undefined when nothing has been removed
   */
  removeSelectedElement(name, instance) {
    let elementTemp;
    if (this._state.selectedElement.instance === instance) {
      elementTemp = instance;
      this._state.selectedElement = null;
    }
    return elementTemp;
  }

  /**
   *  An array of states to match against the current state
   *
   * @param {Array<String>} register
   */
  set dispatchRegister(register) {
    let errorMessages = [];

    register.forEach((state, i) => {
      const validationResult = this._validate(state);
      if(validationResult.length > 0) {
        errorMessages.push({
          validation: validationResult,
          stateIndex: i
        });
      }
    });

    if(errorMessages.length > 0) {
      const message = errorMessages.map((msg) => {
        return `State at index ${msg.stateIndex} is invalid. Found problems are: ${msg.validation.join(", ")};`;
      }).join("\n");

      throw new Error(message);
    }

    this._dispatchRegister = register;
  }

  /**
   * Check whether the element is hovered
   *
   * @param {HoveredElement} element
   */
  isHovered(element) {
    return this._state.hoveredElement.indexOf(element);
  }

  set canvas(canvas) {
    this._canvas = canvas;

    this._state.mousemove = true;
    this.dispatch();
  }

  /**
   * Read-only
   *
   * @readonly
   * @return {string}
   */
  get selectedTool() {
    return this._state.selectedTool;
  }

  /**
   * Read-only
   *
   * @readonly
   * @return {object}
   */
  get selectedElement() {
    return this._state.selectedElement;
  }

  /**
   * Read-only
   *
   * @readonly
   * @return {HoveredElementArray}
   */
  get hoveredElement() {
    return this._state.hoveredElement;
  }

  /**
   * Read-only
   *
   * @readonly
   * @return {null|HoveredElement}
   */
  get downMoveElement() {
    return this._state.downMoveElement;
  }

  /**
   * Read-only
   *
   * @readonly
   * @return {null|HoveredElement}
   */
  get downBeforeElement() {
    return this._state.downBeforeElement;
  }

  /**
   * Read-only
   *
   * @readonly
   * @return {null|HoveredElement}
   */
  get downAfterElement() {
    return this._state.downAfterElement;
  };

  /**
   * Read-only
   *
   * @readonly
   * @return {Boolean}
   */
  get keyboardKeyDown() {
    return this._state.keyboardKeyDown;
  }

  /**
   * Read-only
   *
   * @readonly
   * @return {Array<String>}
   */
  get keyboardKey() {
    return this._state.keyboardKey;
  }

  /**
   * Read-only
   *
   * @readonly
   * @return {Boolean}
   */
  get mousedown() {
    return this._state.mousedown;
  }

  /**
   * Read-only
   *
   * @readonly
   * @return {Boolean}
   */
  get mouseup() {
    return this._state.mouseup;
  }

  /**
   * Read-only
   *
   * @readonly
   * @return {Boolean}
   */
  get mousemove() {
    return this._state.mousemove;
  }

  /**
   * Get the mousedown point;
   * Read-only
   *
   * @readonly
   * @return {Point}
   */
  get mousedownPoint() {
    return this._mousedownPoint;
  }

}

window.ToolDispatcher = new ToolDispatcherBlueprint(window.paper);
export let ToolDispatcher = window.ToolDispatcher;