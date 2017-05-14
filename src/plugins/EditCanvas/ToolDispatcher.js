import Destroyable from "./support/Destroyable";
import {CanvasCursor} from "./support/CanvasCursor";

class ToolDispatcherBlueprint extends Destroyable {
  _tool;
  _dispatchRegister = null;
  _paper;
  _canvas;

  // Used to prevent nesting of dispatch direcives.
  // I.e. a handler of an event can't force a dispatch
  _executingDispatch = false;

  _state = {
    selectedTool: null,

    // todo: integrate reactives
    selectedElement: null,

    // Element which has been hovered at the moment of mousedown;
    // Gets reset at mouseup.
    initialHoveredElement: [],

    // todo: fix double when 1. creating point 2. moving on the point
    hoveredElement: [],

    // todo: cover ctrl+t case
    // todo: support key combinations
    keyboardKeyDown: false,
    keyboardKey: [],

    /**
     * 2^3 giving 8 possibilities as far as mouse events are concerned.
     * Out of all 8 possibilities only 4 will occur during the execution of the program.
     *
     * up |down| move| desc
     * ---------------------------------------------------------------------------------
     *  T | T  |  T  | does not occur; mouseup and mousedown do not occur simultaneously
     *  T | T  |  F  | does not occur; mouseup and mousedown do not occur simultaneously
     *  T | F  |  T  | occurs while moving the mouse on the canvas with no mouse buttons pressed in
     *  F | T  |  T  | occurs while dragging the mouse with one or more buttons pressed in
     *  T | F  |  F  | occurs just after a mouse button has been released
     *  F | T  |  F  | occurs just after a mouse button has been pressed
     *  F | F  |  T  | does not occur
     *  F | F  |  F  | does not occur; by default mouseup is true
     */
    mousedown: false,
    mouseup: true,
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
      this._state.mouseup = false;
      this._state.mousemove = false;
      this._state.mousedown = true;

      this.dispatch(event);
    };

    let dispatchOnMouseUp = (event) => {
      this._state.mouseup = true;
      this._state.mousedown = false;
      this._state.mousemove = false;

      // Guaranteed that after mouseup initialHoveredElement will be empty
      this._state.initialHoveredElement = [];
      this.dispatch(event);
      /**
       * After dispatch, sync back with hoveredElement; hence
       *    1. the next dispatch is not guaranteed to be empty;
       *    2. the dispatch after mouseUp is guarateed to be synced with hoveredElement.
       */
      if(this._state.initialHoveredElement.length === 0 && this._state.hoveredElement.length !== 0) { // true only after mouseup
        this._state.initialHoveredElement = [this._state.hoveredElement[0]] || [];
      }
    };

    let dispatchOnMouseMove = (event) => {
      this._state.mousemove = true;

      if(this._state.initialHoveredElement.length === 0 && this._state.hoveredElement.length !== 0) { // true only after mouseup
        this._state.initialHoveredElement = [this._state.hoveredElement[0]] || [];
      }

      this.dispatch(event);
    };

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
   * Check if there is a state match for the current canvas state in respect to tools
   * @param event
   */
  dispatch(event) {
    if (this._executingDispatch === true) return;

    let stateTemp = this._state;
    let _this = this;

    this._executingDispatch = true;
    console.time("ToolDispatcher: dispatch");
    console.log(stateTemp.initialHoveredElement);
    console.log(stateTemp.hoveredElement);
    console.log(JSON.stringify(stateTemp.keyboardKey));
    let dispatched = false;

    // todo: prevent state collision

    this._dispatchRegister.forEach((entry, i) => {
      let entryLength = Object.values(entry).length;
      let registerLength = Object.values(stateTemp).length;
      if (entryLength - 2 !== registerLength) {
        console.warn("Entry: :", entry, "Current state: ", stateTemp, "...");
        throw new Error(`Entry length (${entryLength}) and register length (${registerLength}) must differ by 2 (the handler and cursor)`);
      }

      let hitArray = [
        // "*" stands for any possible value
        entry.selectedTool === stateTemp.selectedTool || entry.selectedTool === "*",
        entry.selectedElement === stateTemp.selectedElement || entry.selectedElement === "*",
        entry.keyboardKeyDown === stateTemp.keyboardKeyDown || entry.keyboardKeyDown === "*",
        entry.mousedown === stateTemp.mousedown || entry.mousedown === "*",
        entry.mouseup === stateTemp.mouseup || entry.mouseup === "*",
        entry.mousemove === stateTemp.mousemove || entry.mousemove === "*",
      ];


      if (entry.initialHoveredElement === "*") {
        hitArray.push(true);
      }
      else if (entry.initialHoveredElement.length !== stateTemp.initialHoveredElement.length) {
        hitArray.push(false);
      }
      else if (Array.isArray(entry.initialHoveredElement) === true) {
        stateTemp.initialHoveredElement.forEach((initialHoveredElement) => {
          let found = false;
          entry.initialHoveredElement.forEach((element) => {
            if (initialHoveredElement.type === element) {
              found = true;
            }
          });
          hitArray.push(found);
        });
      }
      else {
        throw new Error("Unexpected state");
      }

      /**
       * Since we allow multiple elements to be hovered silmutaneously we must go
       * through checking the match for all of them.
       */
      if (entry.hoveredElement === "*") {
        hitArray.push(true);
      }
      else if (entry.hoveredElement.length !== stateTemp.hoveredElement.length) {
        hitArray.push(false);
      }
      else if (Array.isArray(entry.hoveredElement) === true) {
        stateTemp.hoveredElement.forEach((hoveredElement) => {
          let found = false;
          entry.hoveredElement.forEach((element) => {
            if (hoveredElement.type === element) {
              found = true;
            }
          });
          hitArray.push(found);
        });
      }
      else {
        throw new Error("Unexpected state");
      }

      /**
       * Check if entry's keyboardKey matches current state's keyboardKey
       *
       * All possibilities are:
       * +-----+-------+-------------------------+------------------------------------------------------------+
       * | "*" | array | equivalent array length | description                                                |
       * +-----+-------+-------------------------+------------------------------------------------------------+
       * | T   | T     | T                       | does not occur;                                            |
       * +-----+-------+-------------------------+------------------------------------------------------------+
       * | T   | T     | F                       | does not occur;                                            |
       * +-----+-------+-------------------------+------------------------------------------------------------+
       * | T   | F     | T                       | does not occur;                                            |
       * +-----+-------+-------------------------+------------------------------------------------------------+
       * | F   | T     | T                       | D: check whether all keys exist and are in the right order |
       * +-----+-------+-------------------------+------------------------------------------------------------+
       * | T   | F     | F                       | A: passes                                                  |
       * +-----+-------+-------------------------+------------------------------------------------------------+
       * | F   | F     | T                       | does not occur;                                            |
       * +-----+-------+-------------------------+------------------------------------------------------------+
       * | F   | T     | F                       | B: fails                                                   |
       * +-----+-------+-------------------------+------------------------------------------------------------+
       * | F   | F     | F                       | C: throw an Error; unexpected token                        |
       * +-----+-------+-------------------------+------------------------------------------------------------+
       */
      // A
      if (entry.keyboardKey === "*") {
        hitArray.push(true);
      }
      // B
      else if (Array.isArray(entry.keyboardKey) && entry.keyboardKey.length !== stateTemp.keyboardKey.length) {
        hitArray.push(false);
      }
      // C
      else if (entry.keyboardKey !== "*" && Array.isArray(entry.keyboardKey) === false) {
        throw new TypeError(`Expected "*" or an Array, got ${typeof entry.keyboardKey}`);
      }
      // D
      else if (Array.isArray(entry.keyboardKey) && entry.keyboardKey.length === stateTemp.keyboardKey.length) {
        stateTemp.keyboardKey.forEach((currentKeyCode) => {
          let match = false;
          entry.keyboardKey.forEach((entryKeyCode) => {
            if (currentKeyCode === entryKeyCode) match = true;
          });
          hitArray.push(match);
        });
      } else {
        throw new Error("Unexpected state");
      }

      /**
       * Find a hit, call the handler and apply the cursor...
       */
      if (hitArray.indexOf(false) === -1) {
        if(dispatched !== false) {
          console.warn("State collision", i, entry, dispatched.index, dispatched.entry);
        }
        dispatched = {entry: entry, index: i};
        entry.handler(event, this);
        CanvasCursor.set(entry.cursor, this._canvas);
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
   *  Add a hovered element to the current state
   *
   * @param {string} type
   * @param {*} instance  – whatever the handler will need to process
   * @return {{type: *, instance: *}}
   */
  pushHoveredElement(type, instance) {
    let element = {type: type, instance: instance};
    this._state.hoveredElement.push(element);

    if(this._state.initialHoveredElement.length === 0) { // true only after mouseup
      this._state.initialHoveredElement.push(element);
    }

    this._state.mousemove = true;
    this.dispatch();
    return element;
  }

  /**
   *  Remove a hovered element from the current state
   *
   * @param {object} element – output of ToolDispatcher.pushHoveredElement
   */
  removeHoveredElement(element) {
    let index = this._state.hoveredElement.indexOf(element);
    if (index !== -1) {
      this._state.hoveredElement.splice(index, 1);

      if(this._state.mousedown === false) {
        this._state.initialHoveredElement = [];
      }
      this.dispatch(); // State has now changed, hence we dispatch...
    }
  }

  hoveredElementExistsInRegister(instance) {
    let found = false;
    this._state.hoveredElement.forEach((registerEntry) => {
        if(registerEntry.instance === instance) found = true;
      });
    return found;
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
   * @return {Array}
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

}

window.ToolDispatcher = new ToolDispatcherBlueprint(window.paper);
export let ToolDispatcher = window.ToolDispatcher;