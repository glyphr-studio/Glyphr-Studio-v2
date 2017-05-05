import Destroyable from "./support/Destroyable";

class ToolDispatcherBlueprint extends Destroyable {
  _tool;
  _dispatchRegister = null;

  _state = {
    selectedTool: null,

    // todo: integrate reactives
    selectedElement: null,
    hoveredElement: null,

    // todo: support key combinations
    keyboardKeyDown: null,
    keyboardKeyUp: null,

    /**
     * 2^3 giving 8 possibilities as far as mouse events are concerned.
     * Out of all 8 possibilities only 4 will occur during the execution of the program.
     *
     * up |down| move| desc
     * ---------------------------------------------------------------------------------
        T | T  |  T  | does not occur; mouseup and mousedown do not occur simultaneously
        T | T  |  F  | does not occur; mouseup and mousedown do not occur simultaneously
        T | F  |  T  | occurs while moving the mouse on the canvas with no mouse buttons pressed in
        F | T  |  T  | occurs while dragging the mouse with one or more buttons pressed in
        T | F  |  F  | occurs just after a mouse button has been released
        F | T  |  F  | occurs just after a mouse button has been pressed
        F | F  |  T  | does not occur
        F | F  |  F  | does not occur; by defult mouseup is true
     */
    mousedown: false,
    mouseup: true,
    mousemove: false
  };

  constructor(paper) {
    super();
    this._tool = new paper.Tool();

    let dispatchOnKeyDown = (event) => {
      this._state.keyboardKeyDown = true;
      this._state.keyboardKeyUp = false;
      this.dispatch(event);
    };

    let dispatchOnKeyUp = (event) => {
      this._state.keyboardKeyDown = false;
      this._state.keyboardKeyUp = true;
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
      this.dispatch(event);
    };

    let dispatchOnMouseMove = (event) => {
      this._state.mousemove = true;
      this.dispatch(event);
    };

    let mouseDownHandler = (event) => {
        dispatchOnMouseDown(event)
    };

    this._tool.on("mousemove", dispatchOnMouseMove);
    this._tool.on("keydown", dispatchOnKeyDown);
    this._tool.on("keyup", dispatchOnKeyUp);
    this._tool.on("mouseup", dispatchOnMouseUp);
    this._tool.on("mousedown", dispatchOnMouseDown);

    this.onDestroy(() => {
      this._tool.remove();
      this._tool.off("keydown", dispatchOnKeyUp);
      this._tool.off("keyup", dispatchOnKeyUp);
      this._tool.off("mouseup", dispatchOnMouseUp);
      this._tool.off("mousedown", mouseDownHandler);

      window.ToolDispatcher = new ToolDispatcherBlueprint(window.paper)
    })
  }

  dispatch(event) {
    // console.log(this._state);
    this._dispatchRegister.forEach((entry, i) => {
      let entryLength = Object.values(entry).length;
      let registerLength = Object.values(this._state).length;
      if(entryLength-1 !== registerLength) {
        console.warn(entry, this._dispatchRegister, "...");
        throw new Error(`Entry length (${entryLength}) and register length (${registerLength}) must differ by 1 (the handler)`);
      }

      let hitArray = [
        entry.selectedTool === this._state.selectedTool,
        entry.selectedElement === this._state.selectedElement,
        entry.hoveredElement === this._state.hoveredElement,
        entry.keyboardKeyDown === this._state.keyboardKeyDown,
        entry.keyboardKeyUp === this._state.keyboardKeyUp,
        entry.mousedown === this._state.mousedown,
        entry.mouseup === this._state.mouseup,
        entry.mousemove === this._state.mousemove,
      ];

      if (hitArray.indexOf(false) === -1) {
        entry.handler(event, this, this._state);
        // let k = this._state;
        // console.info("Dispatched tool event to ", entry.handler, k, hitArray, this._dispatchRegister);
      }
    });
  }

  set selectedTool(name) {
    this._state.selectedTool = name;
    this.dispatch();
  }

  set selectedElement(name) {
    this._state.selectedElement = name;
    this.dispatch();
  }

  /**
   *
   * @param {Paper.Item} item
   */
  set hoveredItem(item) {
    this._state.item = item;
    this.dispatch();
  }

  set dispatchRegister(register) {
    this._dispatchRegister = register;
  }
}

window.ToolDispatcher = new ToolDispatcherBlueprint(window.paper);

export let ToolDispatcher = window.ToolDispatcher;