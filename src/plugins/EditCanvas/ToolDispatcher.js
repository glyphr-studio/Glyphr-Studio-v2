import Destroyable from "./support/Destroyable";
import {CanvasCursor} from "./support/CanvasCursor";

class ToolDispatcherBlueprint extends Destroyable {
  _tool;
  _dispatchRegister = null;
  _paper;
  _canvas;

  _state = {
    selectedTool: null,

    // todo: integrate reactives
    selectedElement: null,
    hoveredElement: [],

    // todo: support key combinations
    keyboardKeyDown: false,
    keyboardKeyUp: true,

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
     F | F  |  F  | does not occur; by default mouseup is true
     */
    mousedown: false,
    mouseup: true,
    mousemove: false
  };

  constructor(paper) {
    super();

    this._tool = new paper.Tool();
    this._paper = paper;

    let dispatchOnKeyDown = (toolEvent) => {
      this._state.keyboardKeyDown = `${toolEvent.event.key}`;
      this._state.keyboardKeyUp = false;
      this.dispatch(toolEvent);
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

  /**
   * Check if there is a state match for the current canvas state in respect to tools
   * @param event
   */
  dispatch(event) {
    console.log(this._state);
    this._dispatchRegister.forEach((entry, i) => {
      let entryLength = Object.values(entry).length;
      let registerLength = Object.values(this._state).length;
      if (entryLength - 2 !== registerLength) {
        console.warn("Entry: :", entry, "Current state: ", this._state, "...");
        throw new Error(`Entry length (${entryLength}) and register length (${registerLength}) must differ by 2 (the handler)`);
      }

      let hitArray = [
        entry.selectedTool === this._state.selectedTool,
        entry.selectedElement === this._state.selectedElement,
        entry.keyboardKeyDown === this._state.keyboardKeyDown,
        entry.keyboardKeyUp === this._state.keyboardKeyUp,
        entry.mousedown === this._state.mousedown,
        entry.mouseup === this._state.mouseup,
        entry.mousemove === this._state.mousemove,
      ];

      /**
       * Since we allow multiple elements to be hovered silmutaneously we must go
       * through checking the match for all of them.
       */
      entry.hoveredElement.forEach((elementName) => {
        let found = false;
        this._state.hoveredElement.forEach((element) => {
          if(element.type === elementName) found = true;
        });

        hitArray.push(found);
      });

      /**
       * Find a hit, call the handler and apply the cursor...
       */
      if (hitArray.indexOf(false) === -1) {
        entry.handler(event, this, this._state);
        CanvasCursor.set(entry.cursor, this._canvas);
      }
    });
  }

  /**
   *  Sets selectedTool of the current state
   *
   * @param {string} name
   */
  set selectedTool(name) {
    this._state.selectedTool = name;
    this.dispatch();
  }


  setSelectedElement(name, instance) {
    this._state.selectedElement = name;
    this.dispatch();
  }

  removeSelectedElement(name, instance) {

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
    if(index !== -1) {
      this._state.hoveredElement.splice(index, 1);
      this.dispatch(); // State has now changed, hence we dispatch...
    }
  }

  hasHoveredElement(instance) {
    let found = false;
    this._dispatchRegister.forEach((registerEntry) => {
      registerEntry.hoveredElement.forEach((element) => {
        if(element.instance === instance) found = true;
      })
    });
    return found;
  }

  set canvas(canvas) {
    this._canvas = canvas;
    this.dispatch();
  }
}

window.ToolDispatcher = new ToolDispatcherBlueprint(window.paper);

export let ToolDispatcher = window.ToolDispatcher;