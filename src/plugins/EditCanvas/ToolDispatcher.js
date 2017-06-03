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
    initialHoveredElement: null,

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
      this._state.hoveredElement = new HoveredElementArray(paper.project.hitTestAll(event.point, {fill: true, stroke: true, segments: true, tolerance: 8}));
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
      this._state.initialHoveredElement = this._state.hoveredElement.highestPriorityElement;

      this.dispatch(event);
    };

    let dispatchOnMouseUp = (event) => {
      this._state.mousedown = false;
      this._state.mousemove = false;

      // Guaranteed that after mouseup initialHoveredElement will be empty
      this._state.initialHoveredElement = null;

      this.dispatch(event);


      this._state.hoveredElement = new HoveredElementArray(paper.project.hitTestAll(event.point, {fill: true, stroke: true, segments: true, tolerance: 8}));
      this._state.initialHoveredElement = this._state.hoveredElement.highestPriorityElement;
    };

    let dispatchOnMouseMove = (event) => {
      this._state.mousemove = true;

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
   * Check whether the target matches current state's keyboardKey
   *
   * @private
   * @param {"*"|Array<String>} target
   * @return {Boolean} target matches current state
   */
  _matchKeyboardKey(target) {
    if(target === "*") {
      return true;
    }
    else if(Array.isArray(target) === true && target.length !== this._state.keyboardKey.length) {
      return false;
    }
    else if(Array.isArray(target) === true && target.length === this._state.keyboardKey.length) {
      for(let i=0; i<target.length; i++) {
        if(target[i] !== this._state.keyboardKey[i]) {
          return false;
        }
      }

      return true;
    }
    else {
      throw new TypeError(`Expected "*" or Array<String> got ${typeof target}`);
    }
  }

  /**
   * Check if there is a state match for the current canvas state in respect to tools
   * @param event
   */
  dispatch(event) {
    if (this._executingDispatch === true) return;

    const stateTemp = this._state;
    const _this = this;

    this._executingDispatch = true;
    console.time("ToolDispatcher: dispatch");
    let dispatched = false;

    // todo: prevent state collision

    this._dispatchRegister.forEach((entry, i) => {
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

      if(entry.initialHoveredElement === "*") {
        hitArray["initialHoveredElement"] = true;
      }
      else if(this._state.initialHoveredElement === null || entry.initialHoveredElement === null) {
        hitArray["initialHoveredElement"] = (this._state.initialHoveredElement === entry.initialHoveredElement);
      }
      else {
        hitArray["initialHOveredElement"] = this._state.initialHoveredElement.test(entry.initialHoveredElement);
      }

      hitArray["hoveredElement"] = this._state.hoveredElement.equals(entry.hoveredElement);
      hitArray["keyboardKey"] = this._matchKeyboardKey(entry.keyboardKey);


      console.log(JSON.stringify(this._state), JSON.stringify(hitArray));
      if (Object.values(hitArray).indexOf(false) === -1) {
        if (dispatched !== false) {
          console.warn("State collision", i, entry, dispatched.index, dispatched.entry);
        }
        dispatched = {entry: entry, index: i};
        CanvasCursor.set(entry.cursor, this._canvas);
        entry.handler(event, this);
      }
    });
    console.timeEnd("ToolDispatcher: dispatch");
    this._executingDispatch = false;
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
   * @param {array} register
   */
  set dispatchRegister(register) {
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
   *
   * @return {string}
   */
  get selectedTool() {
    return this._state.selectedTool;
  }

  /**
   *
   * @return {object}
   */
  get selectedElement() {
    return this._state.selectedElement;
  }

  /**
   *
   * @return {Array}
   */
  get hoveredElement() {
    return this._state.hoveredElement;
  }

  /**
   *
   * @return {null|HoveredElement}
   */
  get initialHoveredElement() {
    return this._state.initialHoveredElement;
  }

  /**
   *
   * @return {boolean}
   */
  get keyboardKeyDown() {
    return this._state.keyboardKeyDown;
  }

  /**
   *
   * @return {Array}
   */
  get keyboardKey() {
    return this._state.keyboardKey;
  }

  /**
   *
   * @return {boolean}
   */
  get mousedown() {
    return this._state.mousedown;
  }

  /**
   *
   * @return {boolean}
   */
  get mouseup() {
    return this._state.mouseup;
  }

  /**
   *
   * @return {boolean}
   */
  get mousemove() {
    return this._state.mousemove;
  }

  /**
   * Get the mousedown point
   *
   * @return {Point}
   */
  get mousedownPoint() {
    return this._mousedownPoint;
  }

}

window.ToolDispatcher = new ToolDispatcherBlueprint(window.paper);
export let ToolDispatcher = window.ToolDispatcher;