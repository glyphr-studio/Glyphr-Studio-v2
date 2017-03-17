export default {

  initCanvas(selectedGlyph) {
    this.generateCanvasGrid(selectedGlyph);
    let outlinesLayer = new paper.Layer();
    outlinesLayer.name = 'outlines';
    outlinesLayer.activate();

    this.redrawCanvas(selectedGlyph);
  },

  redrawCanvas(selectedGlyph) {
    console.log('redrawCanvas');

    let glyph, path;
    if (selectedGlyph && window.GlyphrStudio
      && window.GlyphrStudio.currentProject
      && window.GlyphrStudio.currentProject.glyphs
      && window.GlyphrStudio.currentProject.glyphs[selectedGlyph]) {

      glyph = window.GlyphrStudio.currentProject.glyphs[selectedGlyph];

      let displayShapes = new paper.CompoundPath();
      displayShapes.fillRule = 'nonzero';
      displayShapes.fillColor = 'slategray';
      displayShapes.strokeWidth = 1;
      displayShapes.strokeColor = 'gray';

      for (let p in glyph.children) {
        if (glyph.children.hasOwnProperty(p)) {
          // console.log('adding child path');
          // console.log(JSON.stringify(glyph.children[p]));

          /*
           When paper.js exports objects through the exportJSON
           method, it returns an array of length=2:
           ["object name", {JSON properties}]
           When initializing a new Paper object, only the
           JSON properties can be used (not the whole array)
           */
          path = new paper.Path(glyph.children[p][1]);
          // console.log(path.exportJSON());
          displayShapes.addChild(path);
        }
      }

      // console.log(displayShapes.exportJSON());
      paper.view.draw();

    } else {
      console.warn('Edit Canvas - no selected glyph');
    }
  },

  generateCanvasGrid() {
    let gridLayer = new paper.Layer();
    gridLayer.name = 'grid';
    gridLayer.activate();

    function line(pos, horizontal, color) {
      let to, from, path;

      if (horizontal) {
        from = new Point(pos, 3000);
        to = new Point(pos, -3000);
      } else {
        from = new Point(3000, pos * -1);
        to = new Point(-3000, pos * -1);
      }

      path = new Path.Line(from, to);
      path.strokeColor = color;
    }


    // Grid lines
    let chunk = 100;
    for (let i = chunk; i <= chunk * 10; i += chunk) {
      line(i, true, '#eeeeee');
      line(i, false, '#eeeeee');
    }

    let guidesLayer = new paper.Layer();
    guidesLayer.name = 'guides';
    guidesLayer.activate();


    // Primary lines
    line(0, true, '#ff9900');
    line(0, false, '#993300');
  }
};
