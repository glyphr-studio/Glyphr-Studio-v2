import "./../style/default/EditCanvas";
import * as hlpr from "../utils/helpers";

export default React.createClass({

  componentDidMount() {
    hlpr.debug('\n\t EditCanvas_componentDidMount');

    var canvas = document.getElementById('editCanvas');
    paper.setup(canvas);
    hlpr.debug(paper);

    this.redrawEditCanvas();

    hlpr.debug('\t END EditCanvas_componentDidMount');
  },

  redrawEditCanvas() {
    hlpr.debug('\n\t redrawEditCanvas:');
    var data = this.props.data;
    var glyph = data._GP.glyphs[data._UI.selected.glyph];

    hlpr.debug(glyph);
    // glyph.drawOnEditCanvas();

    /**
      MOVE ALL THIS STUFF TO lib/editCanvas
    **/


    /*
      STROKE
    */
/*    hlpr.debug('STROKE');
    glyph.children.forEach(function(v, i, a){
      hlpr.debug('\t Stroke Path ' + i);
      if(!v) return;

      path = new paper.Path(v.pathData);
      path.fillRule = 'nonzero';
      path.strokeWidth = 2;
      path.strokeColor = path.clockwise? 'lime' : 'orange';

      hlpr.debug('\t\t clockwise ' + path.clockwise);
      hlpr.debug('\t\t strokeColor ' + path.strokeColor);
    });
*/
    /*
      POINTS
    */
/*
    var text;
    hlpr.debug('POINTS');
    glyph.children.forEach(function(v, i, a){
      path = new paper.Path(v.pathData);

      path.segments.forEach(function(v, i, a){
        text = new paper.PointText(new paper.Point(v.point.x, v.point.y));
        text.fillColor = 'black';
        text.content = i;
      });
    });
*/

    // paper.view.draw();

    hlpr.debug('\t END redrawEditCanvas');
  },

  clickOn() {

  },

  render() {
    return (
      <div className="centerframe">
        <canvas id="editCanvas"
          onClick={this.clickOn}
          data-paper-resize={true}
        ></canvas>
      </div>
    )
  }
});