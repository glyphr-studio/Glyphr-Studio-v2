import "./../style/default/EditCanvas";
import * as hlpr from "../utils/helpers";
import EventUnit from "./../lib/core/pluginEventStream/PluginEventUnit";
let ecee = new EventUnit("editCanvas", 3);

export default React.createClass({

  componentDidMount() {
    hlpr.debug('\n\t EditCanvas_componentDidMount');

    let canvas = document.getElementById('editCanvas');
    paper.setup(canvas);

    // Adapted from the following Processing example:
    // http://processing.org/learning/topics/follow3.html

    // The amount of points in the path:
      let points = 25;

    // The distance between the points:
    let length = 35;

    let path = new paper.Path.Circle({
      center: paper.view.center,
      radius: 25,
      fillColor: 'black'
    });

    // When the mouse enters the item, set its fill color to red:
    path.attach('mouseenter', function() {
      this.fillColor = 'red';
    });

    let move = function(event) {
      path.setPosition(event.point);
      ecee.emit("mousemove",event);
    };

    path.view.on('mousemove', move);

    // When the mouse leaves the item, set its fill color to black
    // and remove the mover function:
    path.on('mouseleave', function() {
      this.fillColor = 'black';
      path.detach('mouseenter', move);
    });



    paper.view.draw();
  },

  clickOn() {

  },

  render() {
    return (
      <div className="centerframe">
        <canvas id="editCanvas"
          onClick={this.clickOn}
          data-paper-resize={true}></canvas>
      </div>
    )
  }
});