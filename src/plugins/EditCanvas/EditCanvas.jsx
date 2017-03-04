import "./EditCanvas.scss";
import EventUnit from "./../../lib/core/canvasEventStream/CanvasEventUnit";
// import config from "./../../config/config";
// import storage from "./../../lib/storage/Storage";

import "./PenTool";
import "./Layer";

let ecee = new EventUnit("editCanvas", 3);


export default React.createClass({

    componentDidMount() {

        let canvas = document.getElementById('editCanvas');
        paper.setup(canvas);
        settings.handleSize = 10;
        ecee.emit("ready", canvas);

        // console.log("Selected glyph at EditCanvas: " + this.props.selectedGlyph);
        // console.log("GlyphrStudio global var: " + window.GlyphrStudio.currentProject);

        let glyph, path;
        if (this.props.selectedGlyph &&
            window.GlyphrStudio &&
            window.GlyphrStudio.currentProject &&
            window.GlyphrStudio.currentProject.glyphs &&
            window.GlyphrStudio.currentProject.glyphs[this.props.selectedGlyph]) {

            glyph = window.GlyphrStudio.currentProject.glyphs[this.props.selectedGlyph];

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
                        When paper.js exports obects through the exportJSON
                        method, it returns an array of length=2:
                        ["object name", {JSON properties}]
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

    clickOn() {

    },

    render() {
        return (
            <div className="centerFrame">
                <div>
                    <button onClick={ecee.emit.bind(ecee, "switchTool.penTool")}>Pen Tool</button>
                    <button onClick={ecee.emit.bind(ecee, "clearCanvas")}>Clear Canvas</button>
                </div>
                <canvas id="editCanvas"
                        onClick={this.clickOn}
                        data-paper-resize={true}/>
            </div>
        )
    }
});