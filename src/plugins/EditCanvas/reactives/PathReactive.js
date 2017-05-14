import {ToolDispatcher} from "./../ToolDispatcher";
import Destroyable from "./../support/Destroyable";

export default class PathReactive extends Destroyable {
  _path;

  constructor(arg) {
    super();
    this._path = new paper.Path(arg);
    paper.view.draw();


    // todo: fix ghosting
    let mouseEnterHandler = () => {
      if (ToolDispatcher.hoveredElementExistsInRegister(this._path) === false) {
        let hook = ToolDispatcher.pushHoveredElement("Path", this._path);

        let mouseMoveHandler = (event) => {
          if(this._path.contains(event.point) === false) {
            ToolDispatcher.removeHoveredElement(hook);
            paper.view.off("mousemove", mouseMoveHandler);
          }
        };

        this.onDestroy(() => {
          paper.view.off("mousemove", mouseMoveHandler);
          this._path.remove();
        });

        paper.view.on("mousemove", mouseMoveHandler);
      }
    };

    this._path.on("mouseenter", mouseEnterHandler);

    this.onDestroy(() => {
      this._path.off("mouseenter", mouseEnterHandler);
    });

    this._path.reactive = this;

    return this;
  }

  get reactive() {
    return this._path;
  }
}